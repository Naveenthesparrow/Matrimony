const Skeleton = ({ className = '', variant = 'rect', ...props }) => {
    const baseClasses = 'bg-gray-200 animate-pulse';

    const variants = {
        rect: 'rounded-lg',
        circle: 'rounded-full',
        text: 'rounded h-4 w-full',
    };

    return (
        <div
            className={`${baseClasses} ${variants[variant]} ${className}`}
            {...props}
        />
    );
};

export default Skeleton;
