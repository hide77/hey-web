import React from "react";
import PropTypes from "prop-types";

import IconNavSearch from "hey-icons/search_nav.svg";
import IconNavSearchActive from "hey-icons/search_nav_active.svg";
import IconSubscrib from "hey-icons/subscrib_outline.svg";
import IconSubscribActive from "hey-icons/subscrib_outline_active.svg";
import IconNotification from "hey-icons/notifications.svg";
import IconNotificationActive from "hey-icons/notifications_active.svg";
import IconGold from "hey-icons/gold.svg";
import IconHamburger from "hey-icons/hamburger.svg";
import IconClose from "hey-icons/close.svg";
import IconCloseSub from "hey-icons/close_sub.svg";

import IconSideSearch from "hey-icons/search_sidebar.svg";
import IconAbout from "hey-icons/about.svg";
import IconUpdates from "hey-icons/updates.svg";
import IconSettings from "hey-icons/settings.svg";
import IconSelect from "hey-icons/select.svg";
import IconCheckHamburger from "hey-icons/check_hamburger.svg";

import IconCheckCircle from "hey-icons/checkbox_circle.svg";
import IconCheckCircleChecked from "hey-icons/checkbox_circle_checked.svg";

import IconCheckRect from "hey-icons/checkbox_rect.svg";
import IconCheckRectChecked from "hey-icons/checkbox_rect_checked.svg";

import IconSubscribFilledRed from "hey-icons/subscrib_filled_red.svg";
import IconSubscribFilledRedOutline from "hey-icons/subscrib_filled_red_outline.svg";
import IconSubscribFilledWhite from "hey-icons/subscrib_filled_white.svg";

import IconCheck from "hey-icons/check.svg";
import IconTalk from "hey-icons/talk.svg";
import IconDot from "hey-icons/dot.svg";
import IconCross from "hey-icons/cross.svg";
import IconUpload from "hey-icons/upload.svg";

import IconFolder from "hey-icons/folder.svg";
import IconArrowDown from "hey-icons/arrow_down.svg";
import IconArrowRight from "hey-icons/arrow_right.svg";

import IconAttach from "hey-icons/attach.svg";

import IconRectCross from "hey-icons/rect_cross.svg";
const HeyIcon = ({ name, active, fill, ...other }) => {
  var Icon = null;

  switch (name) {
    case "search_nav":
      Icon = IconNavSearch;
      if (active) Icon = IconNavSearchActive;
      break;
    case "subscrib_outline":
      Icon = IconSubscrib;
      if (active) Icon = IconSubscribActive;
      break;
    case "chat_like":
      Icon = active ? IconSubscribFilledRed : IconSubscribFilledRedOutline;
      break;
    case "subscrib_filled_red":
      Icon = IconSubscribFilledRed;
      break;
    case "subscrib_filled_white":
      Icon = IconSubscribFilledWhite;
      break;
    case "notification":
      Icon = IconNotification;
      if (active) Icon = IconNotificationActive;
      break;
    case "gold":
      Icon = IconGold;
      break;
    case "search_sidebar":
      Icon = IconSideSearch;
      break;
    case "talk":
      Icon = IconTalk;
      break;
    case "about":
      return <IconAbout fill={active ? "#50aff0" : "#717375"} />;
    case "updates":
      return <IconUpdates fill={active ? "#50aff0" : "#717375"} />;
    case "settings":
      return <IconSettings {...other} fill={active ? "#50aff0" : "#717375"} />;
    case "attach":
      return (
        <IconAttach
          {...other}
          fill={fill ? fill : active ? "#50aff0" : "#B3B5CC"}
        />
      );
    case "hamburger":
      Icon = IconHamburger;
      break;
    case "close":
      Icon = IconClose;
      break;
    case "close_sub":
      Icon = IconCloseSub;
      break;
    case "select":
      Icon = IconSelect;
      break;
    case "upload":
      Icon = IconUpload;
      break;
    case "checkbox_hamburger":
      return (
        <IconCheckHamburger {...other} fill={active ? "#50AFF0" : "#C5CDDC"} />
      );
    case "checkbox_circle":
      Icon = IconCheckCircle;
      if (active) Icon = IconCheckCircleChecked;
      break;
    case "checkbox_rect":
      Icon = IconCheckRect;
      if (active) Icon = IconCheckRectChecked;
      break;
    case "dot":
      return <IconDot {...other} fill="#D8D8D8" />;
    case "dot-dark":
      return <IconDot {...other} fill="#C5CDDC" />;
    case "check":
      Icon = IconCheck;
      break;
    case "cross":
      Icon = IconCross;
      break;
    case "folder":
      Icon = IconFolder;
      break;
    case "arrow_down":
      Icon = IconArrowDown;
      break;
    case "arrow_right":
      Icon = IconArrowRight;
      break;
    case "rect_cross":
      Icon = IconRectCross;
      break;
    default:
      return <div {...other} />;
  }

  return <Icon {...other} />;
};

HeyIcon.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  fill: PropTypes.string
};

export default HeyIcon;
