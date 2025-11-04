import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
function NotFound() {
    const canvasRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        function random(min, max) {
            return Math.random() * (max - min + 1) + min;
        }

        function range_map(value, in_min, in_max, out_min, out_max) {
            return (
                ((value - in_min) * (out_max - out_min)) / (in_max - in_min) +
                out_min
            );
        }

        let word_arr = [];
        const txt_min_size = 5;
        const txt_max_size = 25;
        let keypress = false;
        const accelerate = 2;

        for (let i = 0; i < 25; i++) {
            word_arr.push(
                {
                    x: random(0, width),
                    y: random(0, height),
                    text: "404",
                    size: random(txt_min_size, txt_max_size),
                },
                {
                    x: random(0, width),
                    y: random(0, height),
                    text: "page",
                    size: random(txt_min_size, txt_max_size),
                },
                {
                    x: random(0, width),
                    y: random(0, height),
                    text: "not found",
                    size: random(txt_min_size, txt_max_size),
                },
                {
                    x: random(0, width),
                    y: random(0, height),
                    text: "404",
                    size: Math.floor(random(txt_min_size, txt_max_size)),
                }
            );
        }

        function render() {
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#fff";
            for (let i = 0; i < word_arr.length; i++) {
                ctx.font = word_arr[i].size + "px sans-serif";
                const w = ctx.measureText(word_arr[i].text);
                ctx.fillText(word_arr[i].text, word_arr[i].x, word_arr[i].y);

                if (keypress) {
                    word_arr[i].x +=
                        range_map(
                            word_arr[i].size,
                            txt_min_size,
                            txt_max_size,
                            2,
                            4
                        ) * accelerate;
                } else {
                    word_arr[i].x += range_map(
                        word_arr[i].size,
                        txt_min_size,
                        txt_max_size,
                        2,
                        3
                    );
                }

                if (word_arr[i].x >= width) {
                    word_arr[i].x = -w.width * 2;
                    word_arr[i].y = random(0, height);
                    word_arr[i].size = Math.floor(
                        random(txt_min_size, txt_max_size)
                    );
                }
            }

            ctx.fill();
            requestAnimationFrame(render);
        }

        render();

        const keyDown = () => (keypress = true);
        const keyUp = () => (keypress = false);
        window.addEventListener("keydown", keyDown);
        window.addEventListener("keyup", keyUp);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("keydown", keyDown);
            window.removeEventListener("keyup", keyUp);
            window.removeEventListener("resize", handleResize);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="notfound-wrapper">
            <canvas ref={canvasRef}></canvas>
            <div className="notfound-overlay">
                <h1>404 Page Not Found</h1>
                <p>Press any key to speed up the chaos!</p>
            </div>
        </div>
    );
}

export default NotFound;
