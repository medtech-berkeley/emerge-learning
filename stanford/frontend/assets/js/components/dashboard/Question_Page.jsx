import React from "react";
import { Accordion } from "./Accordion";
import { Frame } from "./Frame";
import { IconAngleUp } from "./IconAngleUp";
import "./style.css";

export const FrameScreen = () => {
  return (
    <div className="frame-screen">
      <div className="frame-wrapper">
        <div className="div">
          <p className="input-label">
            The manual maneuver recommended for removing suspected foreign body airway obstructions in a responsive
            adult is:
          </p>
          <div className="frame-2">
            <div className="frame-3">
              <div className="frame-4">
                <div className="small-opt-wrapper">
                  <div className="small-opt">Author</div>
                </div>
              </div>
              <div className="frame-5">
                <div className="frame-6">
                  <div className="frame-7">
                    <div className="text-wrapper-2">● medium</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-8">
            <Frame
              className="frame-instance"
              divClassName="design-component-instance-node"
              frameClassName="frame-5-instance"
              hasDiv={false}
              property1="default"
              text="Gloves"
            />
            <div className="frame-9">
              <div className="frame-10">
                <p className="p">Gloves, Mask, Goggles and Gown</p>
              </div>
            </div>
            <Frame
              className="frame-11"
              divClassName="design-component-instance-node"
              frameClassName="frame-5-instance"
              hasDiv={false}
              property1="default"
              text="Gloves and Gown"
            />
            <Frame
              className="frame-11"
              divClassName="design-component-instance-node"
              frameClassName="frame-5-instance"
              hasDiv={false}
              property1="default"
              text="Gloves and Mask"
            />
          </div>
          <div className="preview">
            <div className="text-wrapper-3">Submit</div>
          </div>
          <div className="frame-12">
            <div className="explanation">
              <div className="accordion-title-2">
                <div className="text-wrapper-4">Explanation</div>
                <IconAngleUp className="icon-angle-up" />
              </div>
              <img className="img" alt="Divider" src="image.svg" />
              <div className="accordion-body">
                <p className="an-accordion-menu-is">
                  COVID-19 can be transmitted by droplets and aerosolization. The appropriate PPE (personal protective
                  equipment) includes mask, gloves, gown and eye protection. Ideally, an N95 mask or respirator should
                  be used. This mask should always be used with performed procedures that may cause aerosolization
                  (e.g., intubation, bag mask ventilation, nebulization, noninvasive positive pressure ventilation,
                  etc...)
                </p>
              </div>
            </div>
            <Accordion
              className="accordion-instance"
              divClassName="accordion-2"
              divider="divider-2.svg"
              headerCheckbox={false}
              headerText="References"
              iconAngleDownColor="#00426B"
              type="closed"
            />
            <Accordion
              className="accordion-instance"
              divClassName="accordion-2"
              divider="divider-3.svg"
              headerCheckbox={false}
              headerText="Link"
              iconAngleDownColor="#00426B"
              type="closed"
            />
            <Accordion
              className="accordion-instance"
              divClassName="accordion-2"
              divider="divider-4.svg"
              headerCheckbox={false}
              headerText="Reviewed By"
              iconAngleDownColor="#00426B"
              type="closed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};