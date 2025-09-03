import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

interface ArtworkForm {
  title: string;
  description: string;
  price: string;
  category: "painting" | "sculpture" | "streetart";
}

const Admin = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<ArtworkForm>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "painting",
    },
  });

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
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    try {
      // Create artwork record
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
      form.reset();
      setSelectedFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error('Error adding artwork:', error);
      toast.error("Failed to add artwork");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Add New Artwork</CardTitle>
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

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={uploading}
                >
                  {uploading ? "Adding Artwork..." : "Add Artwork"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;