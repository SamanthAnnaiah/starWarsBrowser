export function Pills({ pnum }) {
  return (
    <>
      <button type="button" data-pnum={pnum}>
        {pnum}
      </button>
    </>
  );
}
