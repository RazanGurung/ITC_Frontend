import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Card Component Types
// ============================================

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

// ============================================
// Padding & Shadow Styles
// ============================================

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
};

const shadowStyles = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

// ============================================
// Card Components
// ============================================

function Card({
  children,
  className,
  padding = 'md',
  shadow = 'sm',
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200',
        paddingStyles[padding],
        shadowStyles[shadow],
        hover && 'transition-shadow duration-200 hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('border-b border-gray-200 pb-4 mb-4', className)}>
      {children}
    </div>
  );
}

function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn('', className)}>{children}</div>;
}

function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('border-t border-gray-200 pt-4 mt-4', className)}>
      {children}
    </div>
  );
}

// ============================================
// Image Card Variant
// ============================================

interface ImageCardProps {
  image: string;
  alt: string;
  title: string;
  description?: string;
  href?: string;
  date?: string;
  className?: string;
}

function ImageCard({
  image,
  alt,
  title,
  description,
  href,
  date,
  className,
}: ImageCardProps) {
  const content = (
    <>
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-6">
        {date && (
          <p className="text-sm text-primary-600 font-medium mb-2">{date}</p>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        )}
      </div>
    </>
  );

  const cardClasses = cn(
    'group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm',
    'transition-shadow duration-200 hover:shadow-md',
    className
  );

  if (href) {
    return (
      <a href={href} className={cardClasses}>
        {content}
      </a>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}

export { Card, CardHeader, CardBody, CardFooter, ImageCard };
export type { CardProps, ImageCardProps };
