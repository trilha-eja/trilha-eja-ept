import NavigationBar from "./NavigationBar";

export default function PageHeader({ title, subtitle, backTo, onBack }) {
  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
      <NavigationBar backTo={backTo} onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-3">
        <h1 className="font-extrabold text-lg leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground leading-snug">{subtitle}</p>
        )}
      </div>
    </div>
  );
}