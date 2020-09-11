import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Image, Grid } from "semantic-ui-react";
import { STYLE_CONFIG } from "hey-config";
import { idx } from "hey-mocks";
import {
  Text,
  HeyIcon,
  Header1,
  Header3,
  Header4,
  FlexInline,
  Markdown,
  TouchableOpacity,
  PageContainer
} from "hey-components";
import { updatePage } from "hey-actions/page";
import { LoadingPage } from "hey-pages";
import BlueHamburger from "hey-assets/images/blue-hamburger.png";
import { withNamespaces } from "react-i18next";

const Section = styled.div`
  padding-top: 17px;
  padding-bottom: 17px;
  position: relative;
`;

const CustomColumn = styled(Grid.Column)`
  @media only screen and (max-width: 500px) {
    .ui.grid > &.column {
      width: ${props =>
        props.mobile
          ? `calc(${props.mobile} / 16 * 100%) !important`
          : `initial`};
    }
  }

  @media only screen and (min-width: 501px) {
    .ui.grid > &.column {
      width: ${props =>
        props.computer
          ? `calc(${props.computer} / 16 * 100%) !important`
          : `initial`};
    }
  }
`;
const MarkdownHeader = styled.div`
  & {
    padding: 17px 30px;
    border-bottom: 2px solid #e3e9f5;
    height: 70px;
    display: flex;
    align-items: center;
  }
  & p {
    font-family: Dosis;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 35px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
    color: #6b727f;
    word-break: break-word;
    margin: 0;
  }
`;
const EditHeader = styled(MarkdownHeader)`
  & {
    border-bottom: 2px solid #2b313c;
    background: #333943;
  }
  & p {
    margin-left: 10px;
  }
`;
const ContentEditor = styled.textarea`
  & {
    font-family: Inconsolata;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 29px;
    color: #c5cddc;
    border: none;
    background: #333943;
    padding: 17px 30px;
    resize: none;
    width: 100%;
    height: calc(100% - 70px);
    word-break: break-word;
  }
  &:focus {
    outline: none;
  }
`;
const MainContainer = styled.div`
  & {
    height: 100%;
    background: white;
    display: flex;
  }
  @media (max-width: 1260px) {
    & {
      display: block;
    }
  }
`;
const EditButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  z-index: 20;
  right: 20px;
`;

const ContentContainer = styled.div`
  padding: 17px 30px;
  height: calc(100% - 70px);
  overflow: auto;
`;
const TotalContainer = styled.div`
  width: 50%;
  @media (max-width: 1260px) {
    width: 100%;
    height: 50%;
  }
`;
class SubscribeContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: "",
      visibleEdit: false,
      isSaving: false
    };
  }
  handleChange = e => {
    this.setState({ editorContent: e.target.value });
  };
  onEdit = () => {
    const { currentPage } = this.props;
    this.setState({
      editorContent: currentPage.about ? currentPage.about : "",
      visibleEdit: true
    });
  };
  onSave = () => {
    this.setState({});
    const { editorContent } = this.state;
    const { dispatch, currentPage } = this.props;
    this.setState({ isSaving: true });
    dispatch(updatePage(currentPage.id, { about: editorContent }))
      .then(r => {
        this.setState({ visibleEdit: false, isSaving: false });
        console.log(r);
      })
      .catch(error => {
        this.setState({ isSaving: false });
        console.log(error);
      });
  };
  onCancel = () => {
    this.setState({ visibleEdit: false });
  };
  onDelete = () => {};
  render() {
    const { currentPage, myInfo, isUserLoading, t } = this.props;
    const { visibleEdit, editorContent, isSaving } = this.state;
    if (isUserLoading) {
      return <LoadingPage />;
    }
    return (
      <React.Fragment>
        {isSaving && <LoadingPage />}
        {!visibleEdit && (
          <PageContainer>
            {currentPage.owner.id === myInfo.id && (
              <EditButton customStyle={"focus"} onClick={this.onEdit}>
                {t("btn.edit")}
              </EditButton>
            )}
            <Section style={{ paddingTop: 70 }}>
              <Grid style={{ maxWidth: 588 }}>
                <CustomColumn computer={6} mobile={10}>
                  <div
                    style={{
                      height: 200,
                      width: "100%",
                      borderRadius: 4,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundImage: `url(${idx(
                        ["pictures", "default"],
                        currentPage
                      )})`
                    }}
                  ></div>
                </CustomColumn>
                <CustomColumn computer={10} mobile={16}>
                  <Header1 color="#3c3c3c">
                    <p>{currentPage.name}</p>
                  </Header1>
                  <FlexInline>
                    <Header4>{t("space.by")}</Header4>
                    <Header4
                      color="#50AFF0"
                      style={{ paddingLeft: 6, paddingRight: 6 }}
                    >
                      {currentPage.owner.name}
                    </Header4>
                    {/*<Label color="white">41.8K</Label>*/}
                  </FlexInline>
                  <Text fontWeight="bold" style={{ fontSize: "18px" }}>
                    {currentPage.description}
                  </Text>
                  <FlexInline>
                    <HeyIcon name="subscrib_filled_red" />
                    <Header3 color="#E95751" style={{ paddingLeft: 6 }}>
                      {currentPage.nb_hearts}
                    </Header3>
                  </FlexInline>
                  <Text fontSize="12px" color="#969eac">
                    {t("space.subscribers", { count: currentPage.nb_users })}
                  </Text>
                </CustomColumn>
              </Grid>
            </Section>
            <Markdown source={currentPage.about ? currentPage.about : ""} />
          </PageContainer>
        )}

        {visibleEdit && (
          <MainContainer>
            <TotalContainer>
              <EditHeader>
                <Image src={BlueHamburger} />
                <p>{currentPage.name}</p>
                <TouchableOpacity
                  customStyle={"focus"}
                  style={{ marginLeft: "auto" }}
                  onClick={this.onSave}
                >
                  {t("btn.save")}
                </TouchableOpacity>
                <TouchableOpacity
                  customStyle={"cancel"}
                  style={{ marginLeft: 10 }}
                  onClick={this.onCancel}
                >
                  {t("btn.cancel")}
                </TouchableOpacity>
              </EditHeader>
              <ContentEditor
                value={editorContent}
                onChange={this.handleChange}
              />
            </TotalContainer>

            <TotalContainer>
              <MarkdownHeader>
                <p>{t("editorPage.preview")}</p>
              </MarkdownHeader>
              <ContentContainer>
                <Markdown source={editorContent} />
              </ContentContainer>
            </TotalContainer>
          </MainContainer>
        )}
      </React.Fragment>
    );
  }
}
SubscribeContentPage.propTypes = {
  currentPage: PropTypes.object,
  myInfo: PropTypes.object,
  moduleID: PropTypes.string,
  isUserLoading: PropTypes.bool,
  dispatch: PropTypes.func
};
function mapStateToProps(state) {
  const { me, isLoading } = state.user;
  const { currentPage } = state.page;
  return {
    currentPage,
    isUserLoading: isLoading,
    myInfo: me
  };
}
export default connect(mapStateToProps)(withNamespaces()(SubscribeContentPage));
