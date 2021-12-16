import Head from "next/head";
import styles from "../styles/Home.module.css";
import { connectToDatabase } from "../db_conn";
import { RecievedArticle } from "../ts_types/db";
export interface Props {
	articles: any;
}

const Home = (props: Props) => {
	console.log("Props: ", props);
	const displayArticles: any[] = []; // Any type because this element will change often
	const articles = JSON.parse(props.articles);
	articles.forEach((i: RecievedArticle) => {
		displayArticles.push(<li key={i._id}>{i.text}</li>);
	});
	return (
		<div className={styles.container}>
			<Head>
				<title>StuySpec Rewrite</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1>Welcome to the stuy spec rewrite in Typescript</h1>
				<ul>{displayArticles}</ul>
			</main>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");
	let articles = await articles_collection.find({}).toArray();
	return {
		props: { articles: JSON.stringify(articles) },
	};
}
