import Card from "../ui/search/card";
export default function Products() {
    return (
        <div>
            <h1>Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
    );
}