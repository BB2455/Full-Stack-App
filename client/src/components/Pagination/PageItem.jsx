import { Link } from "react-router-dom";

const PageItem = ({ num, active, urlLink, special }) => {
  let specialChar;

  switch (special) {
    case "First":
      specialChar = "«";
      break;
    case "Previous":
      specialChar = "‹";
      break;
    case "Next":
      specialChar = "›";
      break;
    case "Last":
      specialChar = "»";
      break;
    default:
      break;
  }

  return (
    <li className={`${active ? "page-item active" : "page-item"}`}>
      {active ? (
        <li className="page-link">{num}</li>
      ) : (
        <Link className="page-link" to={`${urlLink}${num}`}>
          {!specialChar ? (
            num
          ) : (
            <>
              <span aria-hidden="true">{specialChar}</span>
              <span className="visually-hidden">{special}</span>
            </>
          )}
        </Link>
      )}
    </li>
  );
};

export default PageItem;
