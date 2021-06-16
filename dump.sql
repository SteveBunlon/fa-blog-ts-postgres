--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Debian 12.5-1.pgdg100+1)
-- Dumped by pg_dump version 12.5 (Debian 12.5-1.pgdg100+1)

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
-- Name: articles; Type: TABLE; Schema: public; Owner: blog
--

CREATE TABLE public.articles (
    id bigint NOT NULL,
    title character varying,
    body text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    owner_id integer NOT NULL
);


ALTER TABLE public.articles OWNER TO blog;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: blog
--

CREATE SEQUENCE public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_id_seq OWNER TO blog;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: blog
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: articles_ownerId_seq; Type: SEQUENCE; Schema: public; Owner: blog
--

CREATE SEQUENCE public."articles_ownerId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."articles_ownerId_seq" OWNER TO blog;

--
-- Name: articles_ownerId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: blog
--

ALTER SEQUENCE public."articles_ownerId_seq" OWNED BY public.articles.owner_id;


--
-- Name: owners; Type: TABLE; Schema: public; Owner: blog
--

CREATE TABLE public.owners (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.owners OWNER TO blog;

--
-- Name: owner_id_seq; Type: SEQUENCE; Schema: public; Owner: blog
--

CREATE SEQUENCE public.owner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.owner_id_seq OWNER TO blog;

--
-- Name: owner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: blog
--

ALTER SEQUENCE public.owner_id_seq OWNED BY public.owners.id;


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: blog
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: articles owner_id; Type: DEFAULT; Schema: public; Owner: blog
--

ALTER TABLE ONLY public.articles ALTER COLUMN owner_id SET DEFAULT nextval('public."articles_ownerId_seq"'::regclass);


--
-- Name: owners id; Type: DEFAULT; Schema: public; Owner: blog
--

ALTER TABLE ONLY public.owners ALTER COLUMN id SET DEFAULT nextval('public.owner_id_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: blog
--

COPY public.articles (id, title, body, created_at, updated_at, owner_id) FROM stdin;
7	Lorem Ipsum	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suscipit sit amet augue non convallis. Fusce augue ipsum, accumsan nec magna at, sollicitudin placerat lectus. Duis eget dapibus eros. Nulla a eros augue. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt, tortor eu euismod consectetur, mauris augue ultricies eros, vel lacinia tortor ex ut nibh. Nulla metus arcu, aliquam ac metus eu, gravida porta ante. Nunc enim nibh, luctus a feugiat non, ultricies in elit. Suspendisse eget lectus at massa molestie euismod. Cras consectetur dui volutpat metus mattis, a dictum leo luctus.	2021-06-15 09:32:27.666	2021-06-15 09:32:27.666	3
8	Lorem Ipsum	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suscipit sit amet augue non convallis. Fusce augue ipsum, accumsan nec magna at, sollicitudin placerat lectus. Duis eget dapibus eros. Nulla a eros augue. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt, tortor eu euismod consectetur, mauris augue ultricies eros, vel lacinia tortor ex ut nibh. Nulla metus arcu, aliquam ac metus eu, gravida porta ante. Nunc enim nibh, luctus a feugiat non, ultricies in elit. Suspendisse eget lectus at massa molestie euismod. Cras consectetur dui volutpat metus mattis, a dictum leo luctus.	2021-06-15 09:32:56.039	2021-06-15 09:32:56.039	4
\.


--
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: blog
--

COPY public.owners (id, name) FROM stdin;
3	Martin Dupont
4	Lucie Smith
\.


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: blog
--

SELECT pg_catalog.setval('public.articles_id_seq', 8, true);


--
-- Name: articles_ownerId_seq; Type: SEQUENCE SET; Schema: public; Owner: blog
--

SELECT pg_catalog.setval('public."articles_ownerId_seq"', 1, false);


--
-- Name: owner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: blog
--

SELECT pg_catalog.setval('public.owner_id_seq', 4, true);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: blog
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: owners owners_pkey; Type: CONSTRAINT; Schema: public; Owner: blog
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id);


--
-- Name: articles articles_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: blog
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT "articles_ownerId_fkey" FOREIGN KEY (owner_id) REFERENCES public.owners(id);


--
-- PostgreSQL database dump complete
--

