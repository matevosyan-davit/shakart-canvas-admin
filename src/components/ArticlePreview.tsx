import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, FileText } from "lucide-react";

interface ArticlePreviewProps {
  url: string;
  title: string;
  mediaName: string;
}

interface ArticleMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const ArticlePreview = ({ url, title, mediaName }: ArticlePreviewProps) => {
  const [metadata, setMetadata] = useState<ArticleMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=true`
        );
        const data = await response.json();

        if (data.status === 'success' && data.data) {
          setMetadata({
            title: data.data.title || title,
            description: data.data.description || '',
            image: data.data.image?.url || '',
            url: data.data.url || url,
          });
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch article metadata:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchMetadata();
    }
  }, [url, title]);

  if (loading) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="animate-pulse">
          <div className="aspect-video bg-muted" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-5/6" />
          </div>
        </div>
      </Card>
    );
  }

  if (error || !metadata) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Card className="p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 hover:border-accent/50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground mb-1 truncate">{title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{mediaName}</p>
              <div className="flex items-center gap-1 text-xs text-accent">
                <span>Read Article</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        </Card>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 cursor-pointer">
        {metadata.image && (
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={metadata.image}
              alt={metadata.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors">
              {metadata.title}
            </h4>
            <ExternalLink className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
          </div>
          {metadata.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {metadata.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
              {mediaName}
            </span>
            <span className="text-xs text-muted-foreground">
              {new URL(url).hostname.replace('www.', '')}
            </span>
          </div>
        </div>
      </Card>
    </a>
  );
};
