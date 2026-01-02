/**
 * Newsletter/YouTube Call-to-Action
 * @module components/blog/NewsletterCTA
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Youtube, ExternalLink } from 'lucide-react';

export const NewsletterCTA = () => {
  return (
    <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-lg">
            <Youtube className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle>Video-Tutorials auf YouTube</CardTitle>
            <CardDescription className="text-red-700 dark:text-red-300">
              Praxisnahe Erklärungen zur StBVV
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Auf unserem YouTube-Kanal finden Sie detaillierte Video-Anleitungen zur Gebührenberechnung, 
          Mandantenkommunikation und praktische Tipps für Ihren Kanzleialltag.
        </p>
        <Button 
          variant="default" 
          className="bg-red-600 hover:bg-red-700"
          asChild
        >
          <a 
            href="https://www.youtube.com/@Steuerberatergebuehren" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Zum YouTube-Kanal
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
