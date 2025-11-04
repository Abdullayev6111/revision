import axios from "axios";
import { Atom } from "react-loading-indicators";
import { useEffect, useState } from "react";
import {
    Card,
    Image,
    Text,
    Group,
    Button,
    Select,
    Center,
    Container,
    SimpleGrid,
} from "@mantine/core";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios
            .get(
                `https://dummyjson.com/posts?skip=${
                    page * limit
                }&limit=${limit}`
            )
            .then((res) => {
                setPosts(res.data.posts);
                setTotal(res.data.total);
            })
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => setLoading(false));
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
            {loading ? (
                <Center style={{ height: "60vh" }}>
                    <Atom
                        color="#000000"
                        size="large"
                        text="Loading..."
                        textColor=""
                    />
                </Center>
            ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                    {posts?.map((post) => (
                        <Card shadow="sm" padding="xl" key={post.id}>
                            <Card.Section>
                                <Image
                                    src={`https://picsum.photos/seed/${post.id}/800/600`}
                                    h={160}
                                    alt="No way!"
                                />
                            </Card.Section>

                            <Text fw={500} size="lg" mt="md">
                                {post.title}
                            </Text>

                            <Text mt="xs" c="dimmed" size="sm">
                                {post.body}
                            </Text>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
}

export default Posts;
