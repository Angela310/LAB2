import { useFetch } from "../hooks/useFetch";
import { useCounter } from "../hooks/useCounter";
import { Loading } from "./Loading";
import { Card } from "./Card";

export const CustomHook = () => {
  const { counter, decrement, increment } = useCounter(1);
  const { data, hasError, isLoading } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${counter}`
  );

  return (
    <>
      <h1>Información de Pokemon</h1>
      <hr />

      {hasError && <p>Error: {hasError}</p>}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2>{data?.name}</h2>
          <Card
            id={counter}
            name={data?.name}
            sprites={[
              data?.sprites?.front_default,
              data?.sprites?.front_shiny,
              data?.sprites?.back_default,
              data?.sprites?.back_shiny,
            ].filter(Boolean)}
          />
        </>
      )}

      <button
        className="btn btn-danger"
        onClick={() => (counter > 1 ? decrement() : null)}
      >
        Anterior
      </button>

      <button className="btn btn-primary" onClick={() => increment()}>
        Siguiente
      </button>
    </>
  );
};
