import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import searchContext from "../../../store/searchContext";
import { useContext } from "react";
const FilterComponent = () => {
  const { search, setSearch } = useContext(searchContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={search || ""}
        onChange={handleInputChange}
      />
    </Search>
  );
};
export default FilterComponent;
