--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: board_data_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.board_data_entity (
    "boardId" integer NOT NULL,
    "boardSize" integer NOT NULL
);


ALTER TABLE public.board_data_entity OWNER TO postgres;

--
-- Name: food_data_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_data_entity (
    "foodId" integer NOT NULL,
    "foodXPosition" integer NOT NULL,
    "foodYPosition" integer NOT NULL
);


ALTER TABLE public.food_data_entity OWNER TO postgres;

--
-- Name: match_game_data_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.match_game_data_entity (
    "matchGameId" integer NOT NULL,
    "boardId" integer NOT NULL,
    "foodId" integer NOT NULL,
    "matchGameState" character varying NOT NULL
);


ALTER TABLE public.match_game_data_entity OWNER TO postgres;

--
-- Name: score_data_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.score_data_entity (
    "scoreId" integer NOT NULL,
    "matchGameId" integer NOT NULL,
    "userId" integer NOT NULL,
    "snakeId" integer NOT NULL,
    score integer NOT NULL
);


ALTER TABLE public.score_data_entity OWNER TO postgres;

--
-- Name: snake_body_data_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snake_body_data_entity (
    "snakeBodyId" integer NOT NULL,
    "snakeId" integer NOT NULL,
    "snakeIndex" integer NOT NULL,
    "snakeBodyXAxis" integer NOT NULL,
    "snakeBodyYAxis" integer NOT NULL
);


ALTER TABLE public.snake_body_data_entity OWNER TO postgres;

--
-- Name: snake_data_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snake_data_entity (
    "snakeId" integer NOT NULL,
    "snakeDirection" character varying NOT NULL,
    "snakeHeadXPosition" integer NOT NULL,
    "snakeHeadYPosition" integer NOT NULL,
    "snakeSize" integer NOT NULL
);


ALTER TABLE public.snake_data_entity OWNER TO postgres;

--
-- Name: user_data_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_data_entity (
    "userId" integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.user_data_entity OWNER TO postgres;

--
-- Data for Name: board_data_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.board_data_entity ("boardId", "boardSize") FROM stdin;
1	10
\.


--
-- Data for Name: food_data_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food_data_entity ("foodId", "foodXPosition", "foodYPosition") FROM stdin;
1	7	2
\.


--
-- Data for Name: match_game_data_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.match_game_data_entity ("matchGameId", "boardId", "foodId", "matchGameState") FROM stdin;
1	1	1	Playing
\.


--
-- Data for Name: score_data_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.score_data_entity ("scoreId", "matchGameId", "userId", "snakeId", score) FROM stdin;
1	1	1	1	0
3	1	3	3	100
4	1	4	4	100
\.


--
-- Data for Name: snake_body_data_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snake_body_data_entity ("snakeBodyId", "snakeId", "snakeIndex", "snakeBodyXAxis", "snakeBodyYAxis") FROM stdin;
30	3	0	9	9
40	4	0	3	7
\.


--
-- Data for Name: snake_data_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snake_data_entity ("snakeId", "snakeDirection", "snakeHeadXPosition", "snakeHeadYPosition", "snakeSize") FROM stdin;
1	LEFT	7	0	1
4	UP	3	8	2
3	UP	9	0	2
\.


--
-- Data for Name: user_data_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_data_entity ("userId", name) FROM stdin;
1	User1
3	User3
4	User4
\.


--
-- Name: match_game_data_entity PK_05bbee9d7bb2ba3394549fa96a1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_game_data_entity
    ADD CONSTRAINT "PK_05bbee9d7bb2ba3394549fa96a1" PRIMARY KEY ("matchGameId");


--
-- Name: snake_body_data_entity PK_1ad8c6d01288a99e66cb1ad17b2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snake_body_data_entity
    ADD CONSTRAINT "PK_1ad8c6d01288a99e66cb1ad17b2" PRIMARY KEY ("snakeBodyId");


--
-- Name: food_data_entity PK_2267344c7d95b667fffde371dc9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_data_entity
    ADD CONSTRAINT "PK_2267344c7d95b667fffde371dc9" PRIMARY KEY ("foodId");


--
-- Name: score_data_entity PK_31f41761575a8b3eff634e8a665; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.score_data_entity
    ADD CONSTRAINT "PK_31f41761575a8b3eff634e8a665" PRIMARY KEY ("scoreId");


--
-- Name: snake_data_entity PK_c655579646e8ccf9ebf3df4c557; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snake_data_entity
    ADD CONSTRAINT "PK_c655579646e8ccf9ebf3df4c557" PRIMARY KEY ("snakeId");


--
-- Name: board_data_entity PK_cddf76c391174bccdd3815609ce; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board_data_entity
    ADD CONSTRAINT "PK_cddf76c391174bccdd3815609ce" PRIMARY KEY ("boardId");


--
-- Name: user_data_entity PK_e62412e140db1c1494fbd6bb38a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_data_entity
    ADD CONSTRAINT "PK_e62412e140db1c1494fbd6bb38a" PRIMARY KEY ("userId");


--
-- PostgreSQL database dump complete
--

