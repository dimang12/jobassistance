import Layout  from "../Layouts/Layout.jsx";

function Home() {
    return (
        <>
            <h1 className={'title'}>Home</h1>
        </>
    );
}
Home.layout = page => <Layout>{page}</Layout>;
export default Home;
