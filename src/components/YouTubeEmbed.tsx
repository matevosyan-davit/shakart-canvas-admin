import { getYouTubeEmbedUrl, isYouTubeUrl } from "@/utils/videoEmbedHelpers";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

/**
 * YouTubeEmbed Component
 *
 * A reusable component that embeds YouTube videos with proper iframe setup.
 * The video is fully interactive and can be played, paused, and controlled
 * by the user.
 *
 * Usage:
 * <YouTubeEmbed url="https://www.youtube.com/watch?v=VIDEO_ID" title="My Video" />
 */
export const YouTubeEmbed = ({ url, title = "YouTube Video", className = "" }: YouTubeEmbedProps) => {
  // Validate the URL
  if (!url || !isYouTubeUrl(url)) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">Invalid YouTube URL</p>
        </div>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center p-8">
          <p className="text-sm text-muted-foreground">Unable to load video</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        style={{
          border: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default YouTubeEmbed;
