import { Element } from "react-scroll";
import { homePageElements } from "src/data";
import LayoutContainer from "src/layouts/LayoutContainer";
import { IComponent } from "src/types";
import "./MainPage.scss";

const MainPage = () => {
  document.title = "English website";
  const renderPageElements = (pageElements: IComponent[]) => {
    return (
      pageElements.length > 0 &&
      pageElements.map((page: IComponent, index) => (
        <Element className="main-page-element" key={index} name={page.id}>
          {page.component}
        </Element>
      ))
    );
  };
  return (
    <LayoutContainer>{renderPageElements(homePageElements)}</LayoutContainer>
  );
};

export default MainPage;
