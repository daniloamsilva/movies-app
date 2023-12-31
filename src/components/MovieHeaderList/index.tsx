/* eslint-disable @typescript-eslint/no-misused-promises */
import { useCallback } from "react";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setCurrentSearchPage } from "../../redux/features/search-slice";

import { ResponsiveGridLayout, Text, Button } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js"
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js"

import styles from "./styles.module.scss";

type MovieHeaderListProps = {
  handleSetLoading: (value: boolean) => void
}

export function MovieHeaderList({ handleSetLoading }: MovieHeaderListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentSearch, page, totalResults } = useAppSelector(state => state.searchReducer);

  const handlePageChange = useCallback(async (newPage: number) => {
    handleSetLoading(true);
    await dispatch(setCurrentSearchPage({ search: currentSearch, page: newPage }));
    handleSetLoading(false);
  }, [dispatch, handleSetLoading, currentSearch])

  return (
    <>
      <ResponsiveGridLayout columnsXL={2} columnsL={2} columnsM={2} columnsS={2} rowGap='0.5rem' style={{ alignItems: "end" }}>
        <Text>{totalResults} resultados</Text>
        <div style={{ display: "flex", justifyContent: "end", gap: "0.5rem" }} data-test="page-buttons">
          <Button
            icon='navigation-left-arrow'
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          ></Button>
          <Button
            icon='navigation-right-arrow'
            disabled={page === Math.ceil(totalResults / 10)}
            onClick={() => handlePageChange(page + 1)}
          ></Button>
        </div>
      </ResponsiveGridLayout>
      <hr className={styles.divider} />
    </>
  )
}