import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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

interface MediaForm {
  title: string;
  media_name: string;
  embed_link: string;
}

interface MediaItem {
  id: string;
  title: string;
  media_name: string;
  embed_link: string;
  type: string;
  created_at: string;
}

const Admin = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'artworks' | 'add-artwork' | 'media' | 'add-media'>('artworks');
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});

  const form = useForm<ArtworkForm>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "painting",
    },
  });

  const mediaForm = useForm<MediaForm>({
    defaultValues: {
      title: "",
      media_name: "",
      embed_link: "",
    },
  });

  useEffect(() => {
    fetchArtworks();
    fetchMedia();
  }, []);

  useEffect(() => {
    if (editingArtwork) {
      form.reset({
        title: editingArtwork.title,
        description: editingArtwork.description || "",
        price: editingArtwork.price?.toString() || "",
        category: editingArtwork.category as "painting" | "sculpture" | "streetart",
      });
      setActiveTab('add-artwork');
    }
  }, [editingArtwork, form]);

  useEffect(() => {
    if (editingMedia) {
      mediaForm.reset({
        title: editingMedia.title,
        media_name: editingMedia.media_name,
        embed_link: editingMedia.embed_link,
      });
      setActiveTab('add-media');
    }
  }, [editingMedia, mediaForm]);

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

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
      
      // Fetch preview images for non-video URLs
      if (data) {
        data.forEach(async (mediaItem: MediaItem) => {
          const url = extractEmbedUrl(mediaItem.embed_link);
          if (!isVideoUrl(url) && !previewImages[mediaItem.id]) {
            try {
              const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=true`);
              const apiData = await response.json();
              if (apiData.status === 'success' && apiData.data?.image?.url) {
                setPreviewImages(prev => ({
                  ...prev,
                  [mediaItem.id]: apiData.data.image.url
                }));
              }
            } catch (error) {
              console.error('Failed to fetch preview for:', url);
            }
          }
        });
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const extractEmbedUrl = (embedLink: string): string => {
    // If it's already a URL, return it
    if (embedLink.startsWith('http')) {
      return embedLink;
    }
    
    // If it's iframe HTML, extract the src URL
    const srcMatch = embedLink.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    
    // Fallback to the original link
    return embedLink;
  };

  const convertToEmbedUrl = (url: string): string => {
    // Handle YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    // If it's already an embed URL, return as is
    if (url.includes('/embed/')) {
      return url;
    }
    
    // For other URLs, return as is (we'll handle them differently in the display)
    return url;
  };

  const isVideoUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be') || 
           url.includes('vimeo.com') || url.includes('/embed/');
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

  const onSubmitMedia = async (data: MediaForm) => {
    try {
      if (editingMedia) {
        const { error } = await supabase
          .from('media')
          .update({
            title: data.title,
            media_name: data.media_name,
            embed_link: data.embed_link,
          })
          .eq('id', editingMedia.id);

        if (error) throw error;
        toast.success("Media updated successfully!");
        setEditingMedia(null);
      } else {
        const { error } = await supabase
          .from('media')
          .insert({
            title: data.title,
            media_name: data.media_name,
            embed_link: data.embed_link,
          });

        if (error) throw error;
        toast.success("Media added successfully!");
      }

      mediaForm.reset();
      fetchMedia();
    } catch (error) {
      console.error('Error saving media:', error);
      toast.error("Failed to save media");
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

  const handleEditMedia = (mediaItem: MediaItem) => {
    setEditingMedia(mediaItem);
  };

  const handleCancelEditMedia = () => {
    setEditingMedia(null);
    mediaForm.reset();
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;

    try {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId);

      if (error) throw error;
      toast.success("Media deleted successfully!");
      fetchMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
      toast.error("Failed to delete media");
    }
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
      if (editingArtwork) {
        // Refresh editing artwork data
        const updatedArtwork = artworks.find(a => a.id === editingArtwork.id);
        if (updatedArtwork) {
          setEditingArtwork(updatedArtwork);
        }
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Admin Panel</h1>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              variant={activeTab === 'artworks' ? 'default' : 'outline'} 
              onClick={() => { setEditingArtwork(null); setEditingMedia(null); setActiveTab('artworks'); }}
            >
              Manage Artworks
            </Button>
            <Button 
              variant={activeTab === 'add-artwork' ? 'default' : 'outline'} 
              onClick={() => { setEditingArtwork(null); setActiveTab('add-artwork'); }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Artwork
            </Button>
            <Button 
              variant={activeTab === 'media' ? 'default' : 'outline'} 
              onClick={() => { setEditingMedia(null); setEditingArtwork(null); setActiveTab('media'); }}
            >
              Manage Media
            </Button>
            <Button 
              variant={activeTab === 'add-media' ? 'default' : 'outline'} 
              onClick={() => { setEditingMedia(null); setActiveTab('add-media'); }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Media
            </Button>
          </div>
        </div>

        {/* Tab Content - Add/Edit Artwork */}
        {activeTab === 'add-artwork' && (
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
                        <Select onValueChange={field.onChange} value={field.value}>
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

                    {/* Show existing images when editing */}
                    {editingArtwork && editingArtwork.artwork_images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Current Images:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          {editingArtwork.artwork_images.map((image, index) => (
                            <div key={image.id} className="relative">
                              <img
                                src={image.image_url}
                                alt={`Current ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={() => handleDeleteImage(image.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show new image previews */}
                    {previews.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">New Images to Upload:</p>
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
        )}

        {/* Tab Content - Add/Edit Media */}
        {activeTab === 'add-media' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                {editingMedia ? 'Edit Media' : 'Add New Media'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...mediaForm}>
                <form onSubmit={mediaForm.handleSubmit(onSubmitMedia)} className="space-y-6">
                  <FormField
                    control={mediaForm.control}
                    name="title"
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter interview/media title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mediaForm.control}
                    name="media_name"
                    rules={{ required: "Media name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Media Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Armenia TV, Yerevan Arts Radio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mediaForm.control}
                    name="embed_link"
                    rules={{ required: "Embed link is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Embed Link</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="YouTube URL, embed URL, or article link" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    {editingMedia && (
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex-1" 
                        onClick={handleCancelEditMedia}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button type="submit" className="flex-1">
                      {editingMedia ? "Update Media" : "Add Media"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Tab Content - Manage Artworks */}
        {activeTab === 'artworks' && (
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
        )}

        {/* Tab Content - Manage Media */}
        {activeTab === 'media' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Manage Media</CardTitle>
            </CardHeader>
            <CardContent>
              {media.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No media items found. Add some using the "Add Media" tab.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {media.map((mediaItem) => (
                    <Card key={mediaItem.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-primary mb-1">{mediaItem.title}</h3>
                          <p className="text-muted-foreground mb-2">
                            {mediaItem.media_name}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditMedia(mediaItem)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteMedia(mediaItem.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Media Preview */}
                      {isVideoUrl(extractEmbedUrl(mediaItem.embed_link)) ? (
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                          <iframe
                            src={convertToEmbedUrl(extractEmbedUrl(mediaItem.embed_link))}
                            title={mediaItem.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                          {previewImages[mediaItem.id] ? (
                            <div className="relative w-full h-full">
                              <img 
                                src={previewImages[mediaItem.id]} 
                                alt={`Preview of ${mediaItem.title}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <a
                                  href={extractEmbedUrl(mediaItem.embed_link)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs bg-black/70 text-white px-2 py-1 rounded"
                                >
                                  View Article
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center border-2 border-dashed border-border h-full">
                              <div className="text-center p-4">
                                <div className="mb-2">
                                  <svg className="w-12 h-12 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Article Link</p>
                                <a
                                  href={extractEmbedUrl(mediaItem.embed_link)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline"
                                >
                                  View Article
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <p className="text-sm text-muted-foreground">
                        <strong>Embed Link:</strong> {mediaItem.embed_link}
                      </p>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;