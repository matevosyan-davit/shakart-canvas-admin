import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, Edit, Trash2, Plus } from "lucide-react";

interface ArtworkForm {
  title: string;
  description: string;
  price: string;
  category: "painting" | "sculpture" | "streetart";
}

interface ArtworkImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface Artwork {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  category: string;
  created_at: string;
  artwork_images: ArtworkImage[];
}

const Admin = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<ArtworkForm>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "painting",
    },
  });

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    if (editingArtwork) {
      form.reset({
        title: editingArtwork.title,
        description: editingArtwork.description || "",
        price: editingArtwork.price?.toString() || "",
        category: editingArtwork.category as "painting" | "sculpture" | "streetart",
      });
    }
  }, [editingArtwork, form]);

  const fetchArtworks = async () => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          *,
          artwork_images (
            id,
            image_url,
            display_order
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const sortedArtworks = data?.map(artwork => ({
        ...artwork,
        artwork_images: artwork.artwork_images.sort((a: ArtworkImage, b: ArtworkImage) => a.display_order - b.display_order)
      })) || [];
      
      setArtworks(sortedArtworks);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (file: File, artworkId: string, displayOrder: number) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${artworkId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('artwork-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('artwork-images')
      .getPublicUrl(fileName);

    // Save image record to database
    const { error: dbError } = await supabase
      .from('artwork_images')
      .insert({
        artwork_id: artworkId,
        image_url: publicUrl,
        image_path: fileName,
        display_order: displayOrder,
      });

    if (dbError) throw dbError;
  };

  const onSubmit = async (data: ArtworkForm) => {
    if (!editingArtwork && selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    try {
      if (editingArtwork) {
        // Update existing artwork
        const { error: artworkError } = await supabase
          .from('artworks')
          .update({
            title: data.title,
            description: data.description,
            price: parseFloat(data.price),
            category: data.category,
          })
          .eq('id', editingArtwork.id);

        if (artworkError) throw artworkError;

        // Upload new images if any
        if (selectedFiles.length > 0) {
          await Promise.all(
            selectedFiles.map((file, index) => 
              uploadFile(file, editingArtwork.id, editingArtwork.artwork_images.length + index)
            )
          );
        }

        toast.success("Artwork updated successfully!");
        setEditingArtwork(null);
      } else {
        // Create new artwork
        const { data: artwork, error: artworkError } = await supabase
          .from('artworks')
          .insert({
            title: data.title,
            description: data.description,
            price: parseFloat(data.price),
            category: data.category,
          })
          .select()
          .single();

        if (artworkError) throw artworkError;

        // Upload all images
        await Promise.all(
          selectedFiles.map((file, index) => 
            uploadFile(file, artwork.id, index)
          )
        );

        toast.success("Artwork added successfully!");
      }

      form.reset();
      setSelectedFiles([]);
      setPreviews([]);
      fetchArtworks();
    } catch (error) {
      console.error('Error saving artwork:', error);
      toast.error("Failed to save artwork");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setSelectedFiles([]);
    setPreviews([]);
  };

  const handleCancelEdit = () => {
    setEditingArtwork(null);
    form.reset();
    setSelectedFiles([]);
    setPreviews([]);
  };

  const handleDelete = async (artworkId: string) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', artworkId);

      if (error) throw error;
      
      toast.success("Artwork deleted successfully!");
      fetchArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
      toast.error("Failed to delete artwork");
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const { error } = await supabase
        .from('artwork_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;
      
      toast.success("Image deleted successfully!");
      fetchArtworks();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted rounded-md">
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Artwork
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Manage Artworks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter artwork title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter artwork description" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  rules={{ 
                    required: "Price is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid price"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          placeholder="0.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="painting">Painting</SelectItem>
                          <SelectItem value="sculpture">Sculpture</SelectItem>
                          <SelectItem value="streetart">Street Art</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel>Images</FormLabel>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload images or drag and drop
                      </p>
                    </label>
                  </div>

                  {previews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                    <div className="flex gap-4">
                      {editingArtwork && (
                        <Button 
                          type="button" 
                          variant="outline"
                          className="flex-1" 
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button 
                        type="submit" 
                        className="flex-1" 
                        disabled={uploading}
                      >
                        {uploading 
                          ? (editingArtwork ? "Updating..." : "Adding...") 
                          : (editingArtwork ? "Update Artwork" : "Add Artwork")
                        }
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Manage Artworks</CardTitle>
              </CardHeader>
              <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading artworks...</p>
              </div>
            ) : artworks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No artworks found. Add some using the "Add Artwork" tab.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {artworks.map((artwork) => (
                  <Card key={artwork.id} className="p-6">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={artwork.artwork_images[0]?.image_url || '/placeholder.svg'}
                          alt={artwork.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-primary">{artwork.title}</h3>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(artwork)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(artwork.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2 capitalize">{artwork.category}</p>
                        <p className="text-foreground mb-2">${artwork.price?.toFixed(2) || 'Price on request'}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {artwork.description || 'No description'}
                        </p>
                        
                        {artwork.artwork_images.length > 1 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Images ({artwork.artwork_images.length}):</p>
                            <div className="flex gap-2 flex-wrap">
                              {artwork.artwork_images.map((image, index) => (
                                <div key={image.id} className="relative">
                                  <img
                                    src={image.image_url}
                                    alt={`${artwork.title} ${index + 1}`}
                                    className="w-16 h-16 object-cover rounded border"
                                  />
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-5 w-5"
                                    onClick={() => handleDeleteImage(image.id)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;