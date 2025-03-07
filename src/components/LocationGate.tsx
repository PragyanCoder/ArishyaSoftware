import { useState, useEffect } from 'react';
import { trackUserInfo } from '@/lib/tracking';
import { Button } from '@/components/ui/button';
import { MapPin, Database, Loader2 } from 'lucide-react';

interface LocationGateProps {
  children: React.ReactNode;
}

export function LocationGate({ children }: LocationGateProps) {
  const [isLocationGranted, setIsLocationGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    checkLocation();
  }, []);

  const checkLocation = async () => {
    try {
      await trackUserInfo();
      setIsLocationGranted(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Location error:', error);
      setIsLocationGranted(false);
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setRetryCount(prev => prev + 1);
    checkLocation();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="relative mb-6">
              <Database className="h-12 w-12 text-purple-600 mx-auto animate-bounce-slow" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg blur-xl animate-pulse"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Initializing Quantum Core</h3>
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <span className="animate-pulse">•</span>
              <span className="animate-pulse" style={{ animationDelay: '200ms' }}>•</span>
              <span className="animate-pulse" style={{ animationDelay: '400ms' }}>•</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLocationGranted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <MapPin className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Location Access Required</h2>
          <p className="text-gray-600 mb-6">
            To provide you with the best service and ensure optimal server allocation, we need access to your location. Please enable location services to continue.
          </p>
          <Button onClick={handleRetry} className="w-full">
            {retryCount > 0 ? 'Retry Access' : 'Grant Access'}
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}