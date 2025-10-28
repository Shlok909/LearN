import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="text-center">
      <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg">
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="mb-2 text-[22px] font-bold text-foreground">{title}</h3>
      <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
