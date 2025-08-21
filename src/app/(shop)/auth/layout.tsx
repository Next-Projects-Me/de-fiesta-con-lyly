
export default function AuthLayout({ children }: {
    children: React.ReactNode;
}) {

    return (
        <div className="sm:mt-20">
            {children}
        </div>
    );
}