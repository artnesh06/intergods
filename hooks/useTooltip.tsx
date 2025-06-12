import { useState, useCallback } from 'react';

export const useTooltip = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const showTooltip = useCallback((tooltipId: string) => {
    setActiveTooltip(tooltipId);
  }, []);

  const hideTooltip = useCallback(() => {
    setActiveTooltip(null);
  }, []);

  const isTooltipActive = useCallback((tooltipId: string) => {
    return activeTooltip === tooltipId;
  }, [activeTooltip]);

  return {
    activeTooltip,
    showTooltip,
    hideTooltip,
    isTooltipActive
  };
};