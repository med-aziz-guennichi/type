import React from 'react'

import {
    MainContainer,
    InnerContainer1,
    Container1,
    Card1Container1,
    MenuCard1,
    Card1,
    InnerDiv1Card1,
    InnerDiv2Card1,
    InnerButton,
    InnerDiv3Card1,
    Step,
    Text,
    Label,
    Button,
    ButtonRun,
    TextScrole,
    TextStp,
    Card2Container1,
    MenuCard2,
    progressAnimation,
    ProgressBarContainer1,
    ProgressBar1,
    ProgressBarContainer,
    ProgressBar,
    Card2,
    Electric,
    Container2,
    DivVolt,
    InnerDivElect,
    ElectricInner1,
    ElectricInner2,
    MainDiv,
    SubDiv,
    DivVerifier ,
    TextInsideBorder,
    CardButton,
    TextVerif,
    IconCheck,
    IconX,
    StyledSelect,
    LabelSerial,
    LabelModel,
    LabelMac,
    TextGreen,
    LabelStep,
    LabelActivity,
    ModalContainer,
    Run,
    divTextProg,
    LabelEta,
    DivPopup
  
  
  
  } from '../styled-components/StylerunTest'
function TestE() {
  return (
    <Container2>
    <MenuCard2>
        <Text>
            step 1:
        </Text>
        <TextGreen>
            Power Mgt
        </TextGreen>
        <Text>
            step Progress
        </Text>
        <ProgressBarContainer>
                  <ProgressBar progress={progress} />
                 </ProgressBarContainer>
        <Text>
            Activity
        </Text>
        <LabelActivity type="text" value={inputValue} onChange={handleChange} placeholder='#######################'/>
        <LabelStep type="text" value={inputValue} onChange={handleChange} placeholder='#######################'/>

    </MenuCard2>
    
        <Electric>
            <ElectricInner1>
        <MainDiv>
Main Div
<SubDiv>along edge</SubDiv>
</MainDiv>
<MainDiv>
Main Div
<SubDiv>along edge</SubDiv>
</MainDiv>
<MainDiv>
Main Div
<SubDiv>along edge</SubDiv>
</MainDiv>
            </ElectricInner1> 
    </Electric>
    
</Container2>
  )
}

export default TestE