export default async function PoliticsLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="mt-8">
            {children}
        </div>
    );
}