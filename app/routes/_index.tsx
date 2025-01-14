import { Suspense } from "react";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";

export function loader() {
  return defer({
    deferred: new Promise((resolve) =>
      setTimeout(() => {
        resolve("I WAS DEFERRED!!!!!!");
      }, 500)
    ),
  });
}

export default function Deferred() {
  let { deferred } = useLoaderData();
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <p>LOADING...</p>
          </div>
        }
      >
        <Await
          resolve={deferred}
          children={(resolved) => (
            <div>
              <p>{resolved}</p>
            </div>
          )}
        />
      </Suspense>
    </div>
  );
}
