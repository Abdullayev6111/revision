import axios from "axios";
import { Atom } from "react-loading-indicators";
import { useEffect, useState } from "react";
import {
    Card,
    Avatar,
    Text,
    Group,
    Button,
    Select,
    Container,
    SimpleGrid,
} from "@mantine/core";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios
            .get(
                `https://dummyjson.com/products?skip=${
                    page * limit
                }&limit=${limit}`
            )
            .then((res) => {
                setProducts(res.data.products);
                setTotal(res.data.total);
            })
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => setLoading(false));
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [page, limit]);
    return (
        <Container size="lg" mt="md">
            <Group justify="space-between" mb="md">
                <Select
                    label="Sahifada foydalanuvchi:"
                    data={[
                        { value: "5", label: "5" },
                        { value: "10", label: "10" },
                        { value: "20", label: "20" },
                        { value: "50", label: "50" },
                        { value: "100", label: "100" },
                    ]}
                    value={String(limit)}
                    onChange={(value) => {
                        setPage(0);
                        setLimit(Number(value));
                    }}
                    w={200}
                />
                <Group>
                    <Button
                        variant="light"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </Button>
                    <Text>
                        {page * limit + 1} -{" "}
                        {Math.min((page + 1) * limit, total)} / {total}
                    </Text>
                    <Button
                        variant="light"
                        disabled={(page + 1) * limit >= total}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </Group>
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                {loading ? (
                    <Atom
                        color="#000000"
                        size="large"
                        text="Loading..."
                        textColor=""
                    />
                ) : (
                    ""
                )}
                {products?.map((product) => (
                    <Card shadow="md" radius="lg" withBorder key={product.id}>
                        <Group>
                            <Avatar
                                src={product.images}
                                size={60}
                                radius="xl"
                            />
                            <div>
                                <Text fw={500}>{product.title}</Text>
                                <Text size="sm" c="dimmed">
                                    Price: ${product.price}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Warranty: {product.warrantyInformation}
                                </Text>
                            </div>
                        </Group>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
}

export default Products;
