import React, { useState } from "react";
import Switch from "react-switch";
import { ArrowUp, ArrowDown } from "react-feather";
import {
  styles,
  EscalationGrid,
  EscalationValuesGrid,
  LadderGrid,
  LadderValueGrid,
  LadderButtonsGrid,
  LadderStepButtonsGrid,
  LadderQuickButtonsGrid,
  StepButton,
  QuickButton,
  IconStyled,
  EscalationModeGrid,
  EscalationValuesLabels,
  LadderValueLabel
} from "./styles";
import "./styles.css";

import {
  PEEP_INCREMENT,
  FIO2_INCREMENT,
  PEEP_HIGH_SETTINGS,
  PEEP_LOW_SETTINGS,
  FIO2_HIGH_SETTINGS,
  FIO2_LOW_SETTINGS,
  PEEP_QUICK_SETTINGS,
  FIO2_QUICK_SETTINGS,
  peepWarn
} from "./consts";

const IconArrowUp = () => {
  return (
    <IconStyled>
      <ArrowUp size={15} color="white" />
    </IconStyled>
  );
};

const IconArrowDown = () => {
  return (
    <IconStyled>
      <ArrowDown size={15} color="white" />
    </IconStyled>
  );
};

const formatMetric = (metric, value) =>
  `${isNaN(value) ? 0 : metric === "PEEP" ? value : Math.round(value * 100)}`;

const Ladder = ({
  metric,
  value,
  targetValue,
  settings,
  quickSettings,
  onValueChange
}) => {
  const minValue = 0;
  const maxValue = settings[settings.length - 1];
  const increment = metric === "PEEP" ? PEEP_INCREMENT : FIO2_INCREMENT;

  function setValue(val) {
    let v = val > maxValue ? maxValue : val < minValue ? minValue : val;
    onValueChange(v);
  }

  const stepDown = () => setValue(value - increment);
  const stepUp = () => setValue(value + increment);
  const setQuickSetting = qs => {
    return setValue(qs);
  };

  return (
    <LadderGrid>
      <LadderValueGrid>
        <div>{formatMetric(metric, value)}</div>
        <LadderValueLabel>{`${
          metric === "PEEP" ? "cm" : "%"
        } ${metric}`}</LadderValueLabel>
      </LadderValueGrid>
      <LadderButtonsGrid>
        <LadderStepButtonsGrid>
          <StepButton
            onClick={stepUp}
            disabled={value === maxValue}
            // tabIndex="-1"
            aria-hidden="true"
          >
            &#43;
          </StepButton>
          <StepButton
            onClick={stepDown}
            disabled={value === minValue}
            aria-hidden="true"
          >
            &#8722;
          </StepButton>
        </LadderStepButtonsGrid>
        <LadderQuickButtonsGrid>
          {quickSettings.map(qs => (
            <QuickButton onClick={() => setQuickSetting(qs)}>
              {`${qs < 1 ? qs * 100 : qs}`}{" "}
            </QuickButton>
          ))}
        </LadderQuickButtonsGrid>
      </LadderButtonsGrid>
    </LadderGrid>
  );
};

const LadderCalc = () => {
  const [state, setState] = useState({
    peepValue: 0,
    fio2Value: 0,
    isHigh: false,
    isLow: true,
    isInitialsSet: false,
    isDescalate: true,
    isEscalate: false
  });
  function handleUseHigh(isHigh) {
    setState({ ...state, isHigh, isLow: !isHigh });
  }
  function handleUseLow(isLow) {
    setState({ ...state, isHigh: !isLow, isLow });
  }
  function handlePEEPChange(peepValue) {
    setState({ ...state, peepValue });
  }
  function handleFiO2Change(fio2Value) {
    setState({ ...state, fio2Value });
  }
  function handleDescalateSet(isDescalate) {
    setState({ ...state, isDescalate, isEscalate: !isDescalate });
  }
  function handleEscalateSet(isEscalate) {
    setState({ ...state, isDescalate: !isEscalate, isEscalate });
  }

  function findClosestLadderValue(
    peepValue,
    fio2Value,
    isEscalate,
    peepSettings,
    fio2Settings
  ) {
    //find the index of the minimum ladder distance between PEEP and FiO2 values
    const distances = peepSettings.map((pValue, idx) => {
      let fValue = fio2Settings[idx];
      let deltaPValue = pValue - peepValue;
      let deltaFValue = fValue - fio2Value;
      return Math.sqrt(deltaPValue * deltaPValue + deltaFValue * deltaFValue);
    });
    const minDist = Math.min(...distances);
    const minDistIdx = distances.indexOf(minDist);

    let getLadderTarget = (settings, minIdx) => {
      return isEscalate
        ? settings[Math.min(settings.length - 1, minIdx + 1)]
        : settings[Math.max(0, minIdx - 1)];
    };
    //gets next incremental value toward target
    let getTargetValue = (currVal, ladderTarget, inc) => {
      if (isEscalate && currVal < ladderTarget) {
        return currVal + inc;
      } else if (!isEscalate && currVal > ladderTarget) {
        return currVal - inc;
      }
      return currVal;
    };
    let targetPeepValue = getTargetValue(
      state.peepValue,
      getLadderTarget(peepSettings, minDistIdx),
      PEEP_INCREMENT
    );
    let targetFio2Value = getTargetValue(
      state.fio2Value,
      getLadderTarget(fio2Settings, minDistIdx),
      FIO2_INCREMENT
    );
    return {
      peepValue: targetPeepValue,
      fio2Value: targetFio2Value
    };
  }

  const peepSettings = state.isHigh ? PEEP_HIGH_SETTINGS : PEEP_LOW_SETTINGS;
  const fio2Settings = state.isHigh ? FIO2_HIGH_SETTINGS : FIO2_LOW_SETTINGS;
  const targetValues = findClosestLadderValue(
    state.peepValue,
    state.fio2Value,
    state.isEscalate,
    peepSettings,
    fio2Settings
  );

  return (
    <div>
      <EscalationGrid>
        <EscalationValuesGrid id="EscalationValuesGridId">
          <div id="EscalationValuesGridId1">
            {formatMetric("PEEP", targetValues.peepValue)}
          </div>
          <div id="EscalationValuesGridId2">
            {formatMetric("FiO2", targetValues.fio2Value)}
          </div>
          <EscalationValuesLabels>cm PEEP</EscalationValuesLabels>
          <EscalationValuesLabels>% FiO2</EscalationValuesLabels>
        </EscalationValuesGrid>
        <EscalationModeGrid>
          <div>
            TARGET{" "}
            {state.isDescalate ? "CARE DE-ESCALATION" : "CARE ESCALATION"}
          </div>
        </EscalationModeGrid>
      </EscalationGrid>
      <Ladder
        metric="PEEP"
        onValueChange={handlePEEPChange}
        value={state.peepValue}
        targetValue={targetValues.peepValue}
        settings={peepSettings}
        quickSettings={PEEP_QUICK_SETTINGS}
      />
      <Ladder
        metric="FiO2"
        onValueChange={handleFiO2Change}
        value={state.fio2Value}
        targetValue={targetValues.fio2Value}
        settings={fio2Settings}
        quickSettings={FIO2_QUICK_SETTINGS}
      />
      <br />
      <center>
        <b>ARTERIAL OXYGEN or PULSE OXIMETRY</b>
      </center>
      {"PaO2 > 55 mmHg or SpO2 > 88% "}
      <Switch
        onColor="#00ff00"
        offColor="#ff0000"
        width={40}
        height={20}
        checkedIcon={<IconArrowDown />}
        uncheckedIcon={<IconArrowUp />}
        onChange={handleDescalateSet}
        checked={state.isDescalate}
        className="react-switch"
      />
      <br />
      {"PaO2 < 55 mmHg or SpO2 < 88% "}
      <Switch
        onColor="#00ff00"
        offColor="#ff0000"
        width={40}
        height={20}
        checkedIcon={<IconArrowDown />}
        uncheckedIcon={<IconArrowUp />}
        onChange={handleEscalateSet}
        checked={state.isEscalate}
        className="react-switch"
      />
      <br />
      <br />
      <center>
        <b>LADDER SETTING</b>
      </center>
      {"LOW PEEP / HIGH FiO2 "}
      <Switch
        onColor="#00ff00"
        offColor="#ff0000"
        width={40}
        height={20}
        checkedIcon={<IconArrowDown />}
        uncheckedIcon={<IconArrowUp />}
        onChange={handleUseLow}
        checked={state.isLow}
        className="react-switch"
      />
      <br />
      {"HIGH PEEP / LOW FiO2 "}
      <Switch
        onColor="#00ff00"
        offColor="#ff0000"
        width={40}
        height={20}
        checkedIcon={<IconArrowDown />}
        uncheckedIcon={<IconArrowUp />}
        onChange={handleUseHigh}
        checked={state.isHigh}
        className="react-switch"
      />
      <br />
      <br />
      <b>Steps:</b>
      <ol>
        <li>Enter current PEEP and FiO2 values</li>
        <li>Set arterial oxygen level / pulse oximetry</li>
        <li>
          Set ladder setting to LOW PEEP / HIGH FiO2 or HIGH FiO2 / LOW PEEP
        </li>
        <li>
          Recommended PEEP and FiO2 are the next{" "}
          <a href="http://ardsnet.org/files/ventilator_protocol_2008-07.pdf">
            ARDS Ventilator Protocol
          </a>{" "}
          step to descalate or escalate care
        </li>
      </ol>
      <br />
    </div>
  );
};

const ARDSNetLadder = () => (
  <div style={styles.container}>
    <h3>Assistance & Ventilator Calculator</h3>

    <LadderCalc />
  </div>
);

export default ARDSNetLadder;
