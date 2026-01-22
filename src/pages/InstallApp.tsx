/**
 * PWA Install Seite
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Download, 
  Smartphone, 
  Wifi, 
  WifiOff,
  Zap, 
  Check, 
  ArrowLeft,
  Share,
  PlusSquare,
  Calculator
} from 'lucide-react';

export default function InstallApp() {
  const { canInstall, isInstalled, isIOS, promptInstall } = usePWAInstall();

  const features = [
    {
      icon: <WifiOff className="w-5 h-5" />,
      title: 'Offline verfügbar',
      description: 'Funktioniert auch ohne Internetverbindung'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Blitzschnell',
      description: 'Startet sofort wie eine native App'
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Auf dem Homescreen',
      description: 'Direkter Zugriff wie eine normale App'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-bold">STBVV-Rechner</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container max-w-2xl py-12 px-4">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
            <Download className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-3">App installieren</h1>
          <p className="text-muted-foreground text-lg">
            Installieren Sie den STBVV-Rechner auf Ihrem Gerät für schnelleren Zugriff und Offline-Nutzung.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-4 mb-10">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Install Section */}
        {isInstalled ? (
          <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-4">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-400">
                Bereits installiert!
              </h3>
              <p className="text-green-600 dark:text-green-500 mb-4">
                Die App ist auf Ihrem Gerät installiert.
              </p>
              <Link to="/">
                <Button className="gap-2">
                  <Calculator className="w-4 h-4" />
                  Zum Rechner
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : canInstall ? (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Jetzt installieren</CardTitle>
              <CardDescription>
                Ein Klick genügt - keine App Store notwendig
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button size="lg" onClick={promptInstall} className="gap-2 h-14 px-8 text-lg">
                <Download className="w-5 h-5" />
                App installieren
              </Button>
            </CardContent>
          </Card>
        ) : isIOS ? (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Installation auf iOS</CardTitle>
              <CardDescription>
                Folgen Sie diesen Schritten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    Tippen Sie auf <Share className="w-4 h-4" /> Teilen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    In der Safari-Menüleiste unten
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    Wählen Sie <PlusSquare className="w-4 h-4" /> Zum Home-Bildschirm
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Scrollen Sie ggf. nach rechts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Tippen Sie auf "Hinzufügen"</p>
                  <p className="text-sm text-muted-foreground">
                    Die App erscheint auf Ihrem Home-Bildschirm
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Installation</CardTitle>
              <CardDescription>
                So installieren Sie die App
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Öffnen Sie diese Seite in Chrome, Edge oder Safari und nutzen Sie die "Installieren"-Option im Browser-Menü.
              </p>
              <div className="flex justify-center">
                <Link to="/">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Zurück zum Rechner
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Die App benötigt keine Berechtigung und speichert keine persönlichen Daten in der Cloud.
        </p>
      </main>
    </div>
  );
}
