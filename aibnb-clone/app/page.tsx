import getCurrentUSer from "./actions/getCurrentUser";
import getLisitings from "./actions/getLisitings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const getlistings = await getLisitings();
  const currentuser = await getCurrentUSer();
  if (getlistings.length === 0) {
    return (
      <ClientOnly>
        <Container>
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
                currentUser={currentuser ? currentuser : null}
                key={listing.id}
                data={listing}/>
              )
            })}
          </div>
        </Container>
      </ClientOnly>
  );
}
