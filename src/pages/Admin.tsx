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
import { AdminLanguageSwitcher } from "@/components/AdminLanguageSwitcher";
import { Language } from "@/contexts/LanguageContext";
import { getLanguageField, getLanguageValue, createArtworkUpdate, createExhibitionUpdate, createMediaUpdate } from "@/utils/adminLanguageHelpers";

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

interface ExhibitionForm {
  title: string;
  date: string;
  location: string;
  theme: string;
  description: string;
}

interface ExhibitionImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface ExhibitionMedia {
  id: string;
  title: string;
  media_name: string;
  embed_link: string;
  display_order: number;
}

interface Exhibition {
  id: string;
  title: string;
  date: string;
  location: string;
  theme: string | null;
  description: string | null;
  created_at: string;
  exhibition_images: ExhibitionImage[];
  exhibition_media: ExhibitionMedia[];
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
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [editingExhibition, setEditingExhibition] = useState<Exhibition | null>(null);
  const [exhibitionFiles, setExhibitionFiles] = useState<File[]>([]);
  const [exhibitionPreviews, setExhibitionPreviews] = useState<string[]>([]);
  const [exhibitionMediaLinks, setExhibitionMediaLinks] = useState<{title: string, media_name: string, embed_link: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'artworks' | 'add-artwork' | 'media' | 'add-media' | 'exhibitions' | 'add-exhibition'>('artworks');
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});
  const [adminLanguage, setAdminLanguage] = useState<Language>('en');

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

  const exhibitionForm = useForm<ExhibitionForm>({
    defaultValues: {
      title: "",
      date: "",
      location: "",
      theme: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchArtworks();
    fetchMedia();
    fetchExhibitions();
  }, []);

  // Reset forms when admin language changes
  useEffect(() => {
    if (editingArtwork) {
      form.reset({
        title: getLanguageValue(editingArtwork, 'title', adminLanguage),
        description: getLanguageValue(editingArtwork, 'description', adminLanguage),
        price: editingArtwork.price?.toString() || "",
        category: editingArtwork.category as "painting" | "sculpture" | "streetart",
      });
    }
  }, [adminLanguage, editingArtwork, form]);

  useEffect(() => {
    if (editingMedia) {
      mediaForm.reset({
        title: getLanguageValue(editingMedia, 'title', adminLanguage),
        media_name: getLanguageValue(editingMedia, 'media_name', adminLanguage),
        embed_link: editingMedia.embed_link,
      });
    }
  }, [adminLanguage, editingMedia, mediaForm]);

  useEffect(() => {
    if (editingExhibition) {
      exhibitionForm.reset({
        title: getLanguageValue(editingExhibition, 'title', adminLanguage),
        date: editingExhibition.date,
        location: getLanguageValue(editingExhibition, 'location', adminLanguage),
        theme: getLanguageValue(editingExhibition, 'theme', adminLanguage),
        description: getLanguageValue(editingExhibition, 'description', adminLanguage),
      });
    }
  }, [adminLanguage, editingExhibition, exhibitionForm]);

  useEffect(() => {
    if (editingArtwork) {
      form.reset({
        title: getLanguageValue(editingArtwork, 'title', adminLanguage),
        description: getLanguageValue(editingArtwork, 'description', adminLanguage),
        price: editingArtwork.price?.toString() || "",
        category: editingArtwork.category as "painting" | "sculpture" | "streetart",
      });
      setActiveTab('add-artwork');
    }
  }, [editingArtwork, form, adminLanguage]);

  useEffect(() => {
    if (editingMedia) {
      mediaForm.reset({
        title: getLanguageValue(editingMedia, 'title', adminLanguage),
        media_name: getLanguageValue(editingMedia, 'media_name', adminLanguage),
        embed_link: editingMedia.embed_link,
      });
      setActiveTab('add-media');
    }
  }, [editingMedia, mediaForm, adminLanguage]);

  useEffect(() => {
    if (editingExhibition) {
      exhibitionForm.reset({
        title: getLanguageValue(editingExhibition, 'title', adminLanguage),
        date: editingExhibition.date,
        location: getLanguageValue(editingExhibition, 'location', adminLanguage),
        theme: getLanguageValue(editingExhibition, 'theme', adminLanguage),
        description: getLanguageValue(editingExhibition, 'description', adminLanguage),
      });
      setExhibitionFiles([]);
      setExhibitionPreviews([]);
      setExhibitionMediaLinks(editingExhibition.exhibition_media.map(m => ({
        title: m.title,
        media_name: m.media_name,
        embed_link: m.embed_link
      })));
      setActiveTab('add-exhibition');
    }
  }, [editingExhibition, exhibitionForm, adminLanguage]);

  const fetchExhibitions = async () => {
    try {
      const { data, error } = await supabase
        .from('exhibitions')
        .select(`
          *,
          exhibition_images (
            id,
            image_url,
            display_order
          ),
          exhibition_media (
            id,
            title,
            media_name,
            embed_link,
            display_order
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const sortedExhibitions = data?.map(exhibition => ({
        ...exhibition,
        exhibition_images: exhibition.exhibition_images.sort((a: ExhibitionImage, b: ExhibitionImage) => a.display_order - b.display_order),
        exhibition_media: exhibition.exhibition_media.sort((a: ExhibitionMedia, b: ExhibitionMedia) => a.display_order - b.display_order)
      })) || [];
      
      setExhibitions(sortedExhibitions);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
    }
  };

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

  const handleExhibitionFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setExhibitionFiles(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setExhibitionPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExhibitionFile = (index: number) => {
    setExhibitionFiles(prev => prev.filter((_, i) => i !== index));
    setExhibitionPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addExhibitionMediaLink = () => {
    setExhibitionMediaLinks(prev => [...prev, { title: "", media_name: "", embed_link: "" }]);
  };

  const removeExhibitionMediaLink = (index: number) => {
    setExhibitionMediaLinks(prev => prev.filter((_, i) => i !== index));
  };

  const updateExhibitionMediaLink = (index: number, field: string, value: string) => {
    setExhibitionMediaLinks(prev => prev.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    ));
  };

  const uploadExhibitionFile = async (file: File, exhibitionId: string, displayOrder: number) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${exhibitionId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('exhibition-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('exhibition-images')
      .getPublicUrl(fileName);

    // Save image record to database
    const { error: dbError } = await supabase
      .from('exhibition_images')
      .insert({
        exhibition_id: exhibitionId,
        image_url: publicUrl,
        image_path: fileName,
        display_order: displayOrder,
      });

    if (dbError) throw dbError;
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

  const onSubmitExhibition = async (data: ExhibitionForm) => {
    if (!editingExhibition && exhibitionFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    try {
      if (editingExhibition) {
        // Update existing exhibition
        const updateData = createExhibitionUpdate({
          title: data.title,
          location: data.location,
          theme: data.theme || null,
          description: data.description,
        }, adminLanguage, data.date);

        const { error: exhibitionError } = await supabase
          .from('exhibitions')
          .update(updateData)
          .eq('id', editingExhibition.id);

        if (exhibitionError) throw exhibitionError;

        // Upload new images if any
        if (exhibitionFiles.length > 0) {
          await Promise.all(
            exhibitionFiles.map((file, index) => 
              uploadExhibitionFile(file, editingExhibition.id, editingExhibition.exhibition_images.length + index)
            )
          );
        }

        // Update media links
        if (exhibitionMediaLinks.length > 0) {
          // Delete existing media links
          await supabase
            .from('exhibition_media')
            .delete()
            .eq('exhibition_id', editingExhibition.id);

          // Insert new media links
          await Promise.all(
            exhibitionMediaLinks.map((link, index) => 
              supabase
                .from('exhibition_media')
                .insert({
                  exhibition_id: editingExhibition.id,
                  title: link.title,
                  media_name: link.media_name,
                  embed_link: link.embed_link,
                  display_order: index,
                })
            )
          );
        }

        toast.success("Exhibition updated successfully!");
        setEditingExhibition(null);
      } else {
        // Create new exhibition
        const insertData = createExhibitionUpdate({
          title: data.title,
          location: data.location,
          theme: data.theme || null,
          description: data.description,
        }, adminLanguage, data.date);

        const { data: exhibition, error: exhibitionError } = await supabase
          .from('exhibitions')
          .insert(insertData)
          .select()
          .single();

        if (exhibitionError) throw exhibitionError;

        // Upload all images
        await Promise.all(
          exhibitionFiles.map((file, index) => 
            uploadExhibitionFile(file, exhibition.id, index)
          )
        );

        // Insert media links
        if (exhibitionMediaLinks.length > 0) {
          await Promise.all(
            exhibitionMediaLinks.map((link, index) => 
              supabase
                .from('exhibition_media')
                .insert({
                  exhibition_id: exhibition.id,
                  title: link.title,
                  media_name: link.media_name,
                  embed_link: link.embed_link,
                  display_order: index,
                })
            )
          );
        }

        toast.success("Exhibition added successfully!");
      }

      exhibitionForm.reset();
      setExhibitionFiles([]);
      setExhibitionPreviews([]);
      setExhibitionMediaLinks([]);
      fetchExhibitions();
    } catch (error) {
      console.error('Error saving exhibition:', error);
      toast.error("Failed to save exhibition");
    } finally {
      setUploading(false);
    }
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
        const updateData = createArtworkUpdate({
          title: data.title,
          description: data.description,
        }, adminLanguage, parseFloat(data.price), data.category);

        const { error: artworkError } = await supabase
          .from('artworks')
          .update(updateData)
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
        const insertData = createArtworkUpdate({
          title: data.title,
          description: data.description,
        }, adminLanguage, parseFloat(data.price), data.category);

        const { data: artwork, error: artworkError } = await supabase
          .from('artworks')
          .insert(insertData)
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
        const updateData = createMediaUpdate({
          title: data.title,
          media_name: data.media_name,
        }, adminLanguage, data.embed_link);

        const { error } = await supabase
          .from('media')
          .update(updateData)
          .eq('id', editingMedia.id);

        if (error) throw error;
        toast.success("Media updated successfully!");
        setEditingMedia(null);
      } else {
        const insertData = createMediaUpdate({
          title: data.title,
          media_name: data.media_name,
        }, adminLanguage, data.embed_link);

        const { error } = await supabase
          .from('media')
          .insert(insertData);

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

  const handleEditExhibition = (exhibition: Exhibition) => {
    setEditingExhibition(exhibition);
  };

  const handleCancelEditExhibition = () => {
    setEditingExhibition(null);
    exhibitionForm.reset();
    setExhibitionFiles([]);
    setExhibitionPreviews([]);
    setExhibitionMediaLinks([]);
  };

  const handleDeleteExhibition = async (exhibitionId: string) => {
    if (!confirm("Are you sure you want to delete this exhibition?")) return;

    try {
      const { error } = await supabase
        .from('exhibitions')
        .delete()
        .eq('id', exhibitionId);

      if (error) throw error;
      toast.success("Exhibition deleted successfully!");
      fetchExhibitions();
    } catch (error) {
      console.error('Error deleting exhibition:', error);
      toast.error("Failed to delete exhibition");
    }
  };

  const handleDeleteExhibitionImage = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const { error } = await supabase
        .from('exhibition_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;
      
      toast.success("Image deleted successfully!");
      fetchExhibitions();
      if (editingExhibition) {
        // Refresh editing exhibition data
        const updatedExhibition = exhibitions.find(e => e.id === editingExhibition.id);
        if (updatedExhibition) {
          setEditingExhibition(updatedExhibition);
        }
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error("Failed to delete image");
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
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-primary mb-2 tracking-tight">Admin Panel</h1>
              <p className="font-body text-sm text-muted-foreground">Manage your portfolio content</p>
            </div>
            {/* Language Switcher */}
            <AdminLanguageSwitcher
              currentLanguage={adminLanguage}
              onLanguageChange={setAdminLanguage}
            />
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-10">
          <div className="bg-card border border-border/50 rounded-lg p-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <Button
                variant={activeTab === 'artworks' ? 'default' : 'ghost'}
                onClick={() => { setEditingArtwork(null); setEditingMedia(null); setActiveTab('artworks'); }}
                className="font-body text-xs uppercase tracking-wider justify-start"
              >
                Artworks
              </Button>
              <Button
                variant={activeTab === 'add-artwork' ? 'default' : 'ghost'}
                onClick={() => { setEditingArtwork(null); setActiveTab('add-artwork'); }}
                className="font-body text-xs uppercase tracking-wider justify-start"
              >
                <Plus className="w-3 h-3 mr-1.5" /> New Artwork
              </Button>
              <Button
                variant={activeTab === 'media' ? 'default' : 'ghost'}
                onClick={() => { setEditingMedia(null); setEditingArtwork(null); setActiveTab('media'); }}
                className="font-body text-xs uppercase tracking-wider justify-start"
              >
                Media
              </Button>
              <Button
                variant={activeTab === 'add-media' ? 'default' : 'ghost'}
                onClick={() => { setEditingMedia(null); setActiveTab('add-media'); }}
                className="font-body text-xs uppercase tracking-wider justify-start"
              >
                <Plus className="w-3 h-3 mr-1.5" /> New Media
              </Button>
              <Button
                variant={activeTab === 'exhibitions' ? 'default' : 'ghost'}
                onClick={() => { setEditingExhibition(null); setEditingMedia(null); setEditingArtwork(null); setActiveTab('exhibitions'); }}
                className="font-body text-xs uppercase tracking-wider justify-start"
              >
                Exhibitions
              </Button>
              <Button
                variant={activeTab === 'add-exhibition' ? 'default' : 'ghost'}
                onClick={() => { setEditingExhibition(null); setActiveTab('add-exhibition'); }}
                className="font-body text-xs uppercase tracking-wider justify-start"
              >
                <Plus className="w-3 h-3 mr-1.5" /> New Exhibition
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Content - Add/Edit Artwork */}
        {activeTab === 'add-artwork' && (
          <Card className="max-w-3xl mx-auto border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="font-display text-3xl text-primary tracking-tight">
                {editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}
              </CardTitle>
              <p className="font-body text-sm text-muted-foreground mt-2">Fill in the details below to {editingArtwork ? 'update' : 'create'} an artwork</p>
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
                        <FormLabel>Title ({adminLanguage.toUpperCase()})</FormLabel>
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
                        <FormLabel>Description ({adminLanguage.toUpperCase()})</FormLabel>
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
          <Card className="max-w-3xl mx-auto border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="font-display text-3xl text-primary tracking-tight">
                {editingMedia ? 'Edit Media' : 'Add New Media'}
              </CardTitle>
              <p className="font-body text-sm text-muted-foreground mt-2">Add media coverage, interviews, or articles</p>
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
                        <FormLabel>Title ({adminLanguage.toUpperCase()})</FormLabel>
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
                        <FormLabel>Media Name ({adminLanguage.toUpperCase()})</FormLabel>
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
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="font-display text-3xl text-primary tracking-tight">Manage Artworks</CardTitle>
              <p className="font-body text-sm text-muted-foreground mt-2">View and edit your artwork collection</p>
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
                    <Card key={artwork.id} className="group hover:border-accent/30 transition-all duration-300 overflow-hidden">
                      <div className="flex flex-col md:flex-row gap-6 p-6">
                        <div className="w-full md:w-48 h-48 flex-shrink-0">
                          <img
                            src={artwork.artwork_images[0]?.image_url || '/placeholder.svg'}
                            alt={getLanguageValue(artwork, 'title', adminLanguage)}
                            className="w-full h-full object-cover rounded-lg border border-border/50 group-hover:scale-[1.02] transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 min-w-0 mr-4">
                              <h3 className="font-display text-2xl text-primary mb-2 tracking-tight truncate">
                                {getLanguageValue(artwork, 'title', adminLanguage)}
                              </h3>
                              <div className="flex flex-wrap gap-3 items-center">
                                <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent-foreground text-xs font-body uppercase tracking-wider rounded-full">
                                  {artwork.category}
                                </span>
                                <span className="font-body text-sm font-semibold text-primary">
                                  ${artwork.price?.toFixed(2) || 'Price on request'}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(artwork)}
                                className="hover:border-accent hover:text-accent"
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

                          <p className="font-serif text-sm text-foreground/70 line-clamp-2 mb-4 leading-relaxed">
                            {getLanguageValue(artwork, 'description', adminLanguage) || 'No description'}
                          </p>

                          {artwork.artwork_images.length > 1 && (
                            <div className="mt-4 pt-4 border-t border-border/30">
                              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
                                {artwork.artwork_images.length} Images
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                {artwork.artwork_images.map((image, index) => (
                                  <div key={image.id} className="relative group/img">
                                    <img
                                      src={image.image_url}
                                      alt={`${getLanguageValue(artwork, 'title', adminLanguage)} ${index + 1}`}
                                      className="w-20 h-20 object-cover rounded border border-border/50 group-hover/img:border-accent/50 transition-colors"
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
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="font-display text-3xl text-primary tracking-tight">Manage Media</CardTitle>
              <p className="font-body text-sm text-muted-foreground mt-2">View and edit media coverage</p>
            </CardHeader>
            <CardContent>
              {media.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No media items found. Add some using the "Add Media" tab.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {media.map((mediaItem) => (
                    <Card key={mediaItem.id} className="group hover:border-accent/30 transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 min-w-0 mr-4">
                            <h3 className="font-display text-xl text-primary mb-2 tracking-tight truncate">
                              {getLanguageValue(mediaItem, 'title', adminLanguage)}
                            </h3>
                            <p className="font-serif text-sm text-muted-foreground mb-3">
                              {getLanguageValue(mediaItem, 'media_name', adminLanguage)}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditMedia(mediaItem)}
                              className="hover:border-accent hover:text-accent"
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


                        <div className="pt-3 border-t border-border/30">
                          <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Embed Link</p>
                          <a
                            href={mediaItem.embed_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:text-primary transition-colors break-all"
                          >
                            {mediaItem.embed_link}
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tab Content - Add/Edit Exhibition */}
        {activeTab === 'add-exhibition' && (
          <Card className="max-w-4xl mx-auto border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="font-display text-3xl text-primary tracking-tight">
                {editingExhibition ? 'Edit Exhibition' : 'Add New Exhibition'}
              </CardTitle>
              <p className="font-body text-sm text-muted-foreground mt-2">Add exhibition details, images, and media coverage</p>
            </CardHeader>
            <CardContent>
              <Form {...exhibitionForm}>
                <form onSubmit={exhibitionForm.handleSubmit(onSubmitExhibition)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={exhibitionForm.control}
                      name="title"
                      rules={{ required: "Title is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title ({adminLanguage.toUpperCase()})</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter exhibition title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={exhibitionForm.control}
                      name="date"
                      rules={{ required: "Date is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={exhibitionForm.control}
                      name="location"
                      rules={{ required: "Location is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location ({adminLanguage.toUpperCase()})</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter exhibition location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={exhibitionForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme ({adminLanguage.toUpperCase()}) (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter exhibition theme" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={exhibitionForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description ({adminLanguage.toUpperCase()})</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter exhibition description" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Images Section */}
                  <div className="space-y-4">
                    <FormLabel>Images</FormLabel>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleExhibitionFileSelect}
                        className="hidden"
                        id="exhibition-file-upload"
                      />
                      <label htmlFor="exhibition-file-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload exhibition images or drag and drop
                        </p>
                      </label>
                    </div>

                    {/* Show existing images when editing */}
                    {editingExhibition && editingExhibition.exhibition_images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Current Images:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          {editingExhibition.exhibition_images.map((image, index) => (
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
                                onClick={() => handleDeleteExhibitionImage(image.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show new image previews */}
                    {exhibitionPreviews.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">New Images to Upload:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {exhibitionPreviews.map((preview, index) => (
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
                                onClick={() => removeExhibitionFile(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Media Coverage Links Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <FormLabel>Media Coverage Links</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addExhibitionMediaLink}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Media Link
                      </Button>
                    </div>

                    {exhibitionMediaLinks.map((link, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-medium">Media Link {index + 1}</h4>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeExhibitionMediaLink(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <FormLabel>Title</FormLabel>
                            <Input
                              placeholder="Media title"
                              value={link.title}
                              onChange={(e) => updateExhibitionMediaLink(index, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <FormLabel>Media Name</FormLabel>
                            <Input
                              placeholder="e.g., Armenia TV"
                              value={link.media_name}
                              onChange={(e) => updateExhibitionMediaLink(index, 'media_name', e.target.value)}
                            />
                          </div>
                          <div>
                            <FormLabel>Embed Link</FormLabel>
                            <Input
                              placeholder="YouTube URL or article link"
                              value={link.embed_link}
                              onChange={(e) => updateExhibitionMediaLink(index, 'embed_link', e.target.value)}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {editingExhibition && (
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex-1" 
                        onClick={handleCancelEditExhibition}
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
                        ? (editingExhibition ? "Updating..." : "Adding...") 
                        : (editingExhibition ? "Update Exhibition" : "Add Exhibition")
                      }
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Tab Content - Manage Exhibitions */}
        {activeTab === 'exhibitions' && (
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="font-display text-3xl text-primary tracking-tight">Manage Exhibitions</CardTitle>
              <p className="font-body text-sm text-muted-foreground mt-2">View and edit your exhibitions</p>
            </CardHeader>
            <CardContent>
              {exhibitions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No exhibitions found. Add some using the "Add Exhibition" tab.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {exhibitions.map((exhibition) => (
                    <Card key={exhibition.id} className="group hover:border-accent/30 transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 min-w-0 mr-4">
                            <h3 className="font-display text-2xl text-primary mb-3 tracking-tight">
                              {getLanguageValue(exhibition, 'title', adminLanguage)}
                            </h3>
                            {exhibition.theme && (
                              <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent-foreground text-xs font-body uppercase tracking-wider rounded-full mb-3">
                                {getLanguageValue(exhibition, 'theme', adminLanguage)}
                              </span>
                            )}
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="font-body font-medium">Date:</span>
                                <span className="font-serif">{new Date(exhibition.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="font-body font-medium">Location:</span>
                                <span className="font-serif">{getLanguageValue(exhibition, 'location', adminLanguage)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditExhibition(exhibition)}
                              className="hover:border-accent hover:text-accent"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteExhibition(exhibition.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {exhibition.description && (
                          <p className="font-serif text-sm text-foreground/70 mb-4 leading-relaxed line-clamp-2">
                            {getLanguageValue(exhibition, 'description', adminLanguage)}
                          </p>
                        )}

                        {/* Images */}
                        {exhibition.exhibition_images.length > 0 && (
                          <div className="mb-4 pt-4 border-t border-border/30">
                            <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
                              {exhibition.exhibition_images.length} Images
                            </p>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                              {exhibition.exhibition_images.map((image, index) => (
                                <div key={image.id} className="group/img relative">
                                  <img
                                    src={image.image_url}
                                    alt={`${getLanguageValue(exhibition, 'title', adminLanguage)} ${index + 1}`}
                                    className="w-full aspect-square object-cover rounded border border-border/50 group-hover/img:border-accent/50 transition-colors"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Media Coverage */}
                        {exhibition.exhibition_media.length > 0 && (
                          <div className="pt-4 border-t border-border/30">
                            <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
                              {exhibition.exhibition_media.length} Media Coverage
                            </p>
                            <div className="space-y-2">
                              {exhibition.exhibition_media.map((media) => (
                                <div key={media.id} className="bg-muted/50 p-3 rounded border border-border/30">
                                  <p className="font-body text-sm font-medium text-primary mb-1">{media.title}</p>
                                  <p className="font-serif text-xs text-muted-foreground mb-2">{media.media_name}</p>
                                  <a
                                    href={media.embed_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-accent hover:text-primary transition-colors inline-flex items-center gap-1"
                                  >
                                    View Link →
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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