import getCurrentUSer from "./actions/getCurrentUser";
import getLisitings from "./actions/getLisitings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export default async function Home() {
  const getlistings = await getLisitings();
  const currentuser = await getCurrentUSer();
  if (getlistings.length === 0) {
    return (
      <ClientOnly>
        <Container>
          {/* <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            <div>
              <div className="flex justify-center items-center h-96">
                <div className="text-center">
                  <h1 className="text-5xl font-bold">No listings found</h1>
                  <p className="text-lg mt-4">Create a listing to get started</p>
                </div>
              </div>
            </div>
          </div> */}
          <EmptyState showReset />
        </Container>
      </ClientOnly>
    );
  }
  return (
      <ClientOnly>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {getlistings.map((listing) => {
              return (
                <ListingCard
                currentUser={currentuser}
                key={listing.id}
                data={listing}/>
              )
            })}
          </div>
        </Container>
      </ClientOnly>
  );
}
