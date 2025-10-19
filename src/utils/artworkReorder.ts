import { supabase } from '@/integrations/supabase/client';

export interface ArtworkOrderUpdate {
  id: string;
  display_order: number;
}

/**
 * Reorders artworks when one is moved from oldIndex to newIndex
 * Updates all affected artworks' display_order in the database
 */
export const reorderArtworks = async (
  artworks: { id: string; display_order: number }[],
  oldIndex: number,
  newIndex: number
): Promise<boolean> => {
  try {
    const updates: ArtworkOrderUpdate[] = [];

    // Create a copy to work with
    const reordered = [...artworks];

    // Remove the item from old position
    const [movedItem] = reordered.splice(oldIndex, 1);

    // Insert it at new position
    reordered.splice(newIndex, 0, movedItem);

    // Update display_order for all items to match their new positions
    reordered.forEach((artwork, index) => {
      const newOrder = index + 1; // 1-based indexing
      if (artwork.display_order !== newOrder) {
        updates.push({
          id: artwork.id,
          display_order: newOrder
        });
      }
    });

    // Batch update all affected artworks
    if (updates.length > 0) {
      const { error } = await supabase.rpc('update_artwork_order', {
        updates: updates
      });

      // If RPC doesn't exist, fallback to individual updates
      if (error?.code === '42883') {
        for (const update of updates) {
          const { error: updateError } = await supabase
            .from('artworks')
            .update({ display_order: update.display_order })
            .eq('id', update.id);

          if (updateError) throw updateError;
        }
      } else if (error) {
        throw error;
      }
    }

    return true;
  } catch (error) {
    console.error('Error reordering artworks:', error);
    return false;
  }
};
