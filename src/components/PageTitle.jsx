import PropTypes from "prop-types";

const PageTitle = ({ data }) => {
  return <div className="page-title">{data || "{insira um título}"}</div>;
};

PageTitle.propTypes = {
  data: PropTypes.string,
};

export default PageTitle;
