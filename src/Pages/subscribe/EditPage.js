import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  Text,
  Header1,
  Header5,
  HeyIcon,
  PageContainer,
  TouchableOpacity,
  FlexInline,
  UserCard,
  SelectBox
} from "hey-components";
import {
  LoginInput,
  LoginTextarea,
  ErrorMessage
} from "hey-components/loginComponents";
import * as FileUpload from "hey-services/FileUpload";
import { updatePage, addLevelToPage } from "hey-actions/page";
import { withNamespaces } from "react-i18next";
import { LoadingPage, ErrorPage } from "hey-pages";
import { idx } from "hey-mocks";

const Content = styled(Text)`
  line-height: 29px;
  padding-bottom: 22px;
  color: #7b7b7b;
`;

const Section = styled.div`
  padding-top: 35px;
  padding-bottom: 15px;
  position: relative;
`;
const EditFlex = styled.div`
  & {
    display: flex;
    margin-top: 20px;
  }

  @media only screen and (min-width: 768px) and (max-width: 992px) {
    & {
      flex-wrap: wrap;
    }
    & {
      flex-wrap: wrap;
    }
    & > div:last-child {
      padding: 0px !important;
    }
  }
  @media (max-width: 576px) {
    & {
      flex-wrap: wrap;
    }
    & > div:last-child {
      padding: 0px !important;
    }
  }
`;
const EditInput = styled(LoginInput)`
  & {
    margin: 0;
    max-width: 600px;
    width: 100%;
  }
  &.price {
    width: 100px;
  }
`;
const EditTextareaInput = styled(LoginTextarea)`
  & {
    margin: 0;
    max-width: 600px;
    width: 100%;
  }
  &.price {
    width: 100px;
  }
`;
const UploadButton = styled.div`
  & {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  &:hover {
    cursor: pointer;
  }

  & p {
    font-family: Dosis;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 29px;
    padding-top: 5px;
    padding-left: 5px;
    text-transform: uppercase;
    color: #50aff0;
  }
`;
const AbsolutedFlexInline = styled(FlexInline)`
  position: absolute;
  right: 20px;
  z-index: 20;
  & button:last-child {
    margin-left: 10px;
  }
`;
const currencyOptions = [
  { key: "euro", value: "EUR", text: "€" },
  { key: "dollar", value: "USD", text: "$" },
  { key: "pound", value: "GBP", text: "£" }
];

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.pageInfo.name,
      description: props.pageInfo.description,
      pictures: idx(["pictures"], props.pageInfo),
      keywords: props.pageInfo.keywords.join(","),
      price: props.pageInfo.subscription_price
        ? props.pageInfo.subscription_price
        : "",
      currency: props.pageInfo.currency ? props.pageInfo.currency : "EUR",
      category: "",
      name_valid: false,
      description_valid: false,
      keywords_valid: false,
      price_valid: false,
      pictures_valid: false,
      isSpaceUpdating: false
    };
  }

  componentDidMount() {
    this.fileSelector = FileUpload.buildFileSelector(e => {
      FileUpload.post({
        token: this.props.token,
        file: e.target.files[0],
        cb: imagePath => {
          console.log("image uploaded: ", imagePath);
          this.setState({
            pictures: {
              default:
                imagePath.indexOf("http") === 0
                  ? imagePath
                  : `https://${imagePath}`
            }
          });
        }
      });
    });
  }

  handleFileSelect = e => {
    e && e.preventDefault();
    this.fileSelector.click();
    this.setState({ pictures_valid: false });
  };
  validate = () => {
    const { name, description, keywords, price, pictures } = this.state;
    var valid = true;
    if (name === "") {
      this.setState({ name_valid: true });
      valid = false;
    }
    if (description === "") {
      this.setState({ description_valid: true });
      valid = false;
    }
    let keywords_array = keywords.split(",").map(function(item) {
      return item.trim();
    });
    if (keywords_array.length === 1 && keywords_array[0] === "") {
      this.setState({ keywords_valid: true });
      valid = false;
    }
    if (price !== "" && !parseFloat(price)) {
      this.setState({ price_valid: true });
      valid = false;
    }
    if (pictures.default === "") {
      this.setState({ pictures_valid: true });
      valid = false;
    }
    return valid;
  };
  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.setState({
      [e.target.name + "_valid"]: false
    });
  };
  onSelectChange = (e, data) => {
    this.setState({ currency: data.value });
  };
  onSave = () => {
    const { history, pageInfo } = this.props;
    const {
      name,
      keywords,
      description,
      pictures,
      price,
      currency
    } = this.state;
    const { dispatch } = this.props;
    if (this.validate()) {
      let keywords_array = keywords.split(",").map(function(item) {
        return item.trim();
      });
      this.setState({ isSpaceUpdating: true });
      dispatch(
        updatePage(pageInfo.id, {
          name,
          keywords: keywords_array,
          pictures,
          description
        })
      )
        .then(page => {
          console.log("update page success:", page);
          this.setState({ isSpaceUpdating: false });
        })
        .catch(error => {
          this.setState({ isSpaceUpdating: false });
          console.log("create page error:", error);
        });
    }
  };
  onCancel = () => {
    const { history } = this.props;
    history.push(`/subscribe/pages/about`);
  };
  render() {
    const { pageInfo, t, error, myInfo } = this.props;
    const {
      name,
      keywords,
      description,
      price,
      currency,
      pictures,
      name_valid,
      keywords_valid,
      description_valid,
      price_valid,
      pictures_valid,
      isSpaceUpdating
    } = this.state;
    if (pageInfo.owner.id !== myInfo.id) {
      return <ErrorPage />;
    }
    return (
      <PageContainer style={{ paddingTop: 40 }}>
        {isSpaceUpdating && <LoadingPage />}
        {pageInfo.owner.id === myInfo.id && (
          <AbsolutedFlexInline>
            <TouchableOpacity customStyle={"focus"} onClick={this.onSave}>
              {t("editSpacePage.save_btn")}
            </TouchableOpacity>
            <TouchableOpacity customStyle={"cancel"} onClick={this.onCancel}>
              {t("editSpacePage.cancel_btn")}
            </TouchableOpacity>
          </AbsolutedFlexInline>
        )}
        <Section>
          <Header1 color="#3c3c3c">{t("editSpacePage.title")}</Header1>
          <Content>{t("editSpacePage.subtitle")}</Content>
          {error && <ErrorMessage>*{error}</ErrorMessage>}
          <EditFlex>
            <div style={{ marginTop: 10 }}>
              {pictures_valid && (
                <ErrorMessage>*Please select a cover image</ErrorMessage>
              )}
              <UserCard
                editMode={true}
                editCover={this.handleFileSelect}
                title={this.state.name}
                userInfo={pageInfo.owner}
                backImage={pictures.default}
                width={227}
                fixed
              />
            </div>
            <div style={{ padding: "0 20px", width: "100%" }}>
              <Header5 color="#1C1E23">
                {t("editSpacePage.space_name_label")}
              </Header5>
              <EditInput
                placeholder={t("editSpacePage.space_name_placeholder")}
                name="name"
                value={name}
                onChange={this.onChangeInput}
                inValid={name_valid}
              />
              {/*<UploadButton onClick={this.handleFileSelect}>
                <HeyIcon name="upload" />
                <p>{t("editSpacePage.upload_cover")}</p>
              </UploadButton>*/}
              <Header5 color="#1C1E23">
                {t("editSpacePage.space_keywords_label")}
              </Header5>
              <EditInput
                placeholder={t("editSpacePage.space_keywords_placeholder")}
                name="keywords"
                value={keywords}
                onChange={this.onChangeInput}
                inValid={keywords_valid}
              />
              <Header5 color="#1C1E23">
                {t("editSpacePage.space_description_label")}
              </Header5>
              <EditTextareaInput
                placeholder={t("editSpacePage.space_description_placeholder")}
                name="description"
                value={description}
                onChange={this.onChangeInput}
                inValid={description_valid}
              />
            </div>
          </EditFlex>
        </Section>
        {/* FOR LATER
          <Section>
            <Header1 color="#3c3c3c">
              {t("editSpacePage.sub_price_title")}
            </Header1>
            <Content>{t("editSpacePage.sub_price_subtitle")}</Content>
            <FlexInline style={{ marginTop: "15px" }}>
              <EditInput
                placeholder="0"
                className="price"
                name="price"
                value={price}
                onChange={this.onChangeInput}
                inValid={price_valid}
              />
              <SelectBox
                compact
                options={currencyOptions}
                width={70}
                value={currency}
                style={{ marginLeft: 20 }}
                onChange={this.onSelectChange}
              />
              <Content style={{ marginLeft: 15 }}>
                {t("editSpacePage.per_month")}
              </Content>
            </FlexInline>
          </Section>
          <Section>
          <Header1 color="#3c3c3c">
            {t("editSpacePage.danger_zone_title")}
          </Header1>
          <Content>{t("editSpacePage.danger_zone_subtitle")}</Content>
          <FlexInline style={{ marginTop: "20px" }}>
            <TouchableOpacity customStyle={"danger"} style={{ width: 148 }}>
              {t("editSpacePage.danger_zone_unpublish")}
            </TouchableOpacity>
          </FlexInline>
        </Section>*/}
      </PageContainer>
    );
  }
}

EditPage.propTypes = {
  pageInfo: PropTypes.object,
  token: PropTypes.string,
  myInfo: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  t: PropTypes.func
};
function mapStateToProps(state) {
  const { error } = state.page;
  const { token } = state.authentication;
  const { me } = state.user;
  return {
    token,
    error,
    myInfo: me
  };
}
export default connect(mapStateToProps)(withNamespaces()(EditPage));
