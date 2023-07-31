import React, { useState, useEffect } from 'react';

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
import axios from 'axios';
import { publicRequest } from '../requestMethod';

function Runtest() {
    const [progress, setProgress] = useState(0);
    const [type, setType] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [serial,setSerial] = useState("")
    const [data,setData] = useState({})
  

    // get the scan
    const handleFetch = async() =>{
        try {
            const data = await publicRequest.get("/tram/COM9");
            console.log(data)
            setData(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    // Simulating progress completion
    useEffect(() => {
        const interval = setInterval(() => {
          setProgress((prevProgress) => prevProgress + 10);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      // Check if progress is completed (100%) and show the popup
      useEffect(() => {
        if (progress === 100) {
          setShowPopup(true);
        }
      }, [progress]);
    
      const handlePopupClose = () => {
        setShowPopup(false);
      };
      const [inputValue, setInputValue] = useState('test');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
    
    
  return (
    <MainContainer>
        <Container1>
            <InnerContainer1>
            <Card1Container1>
                <MenuCard1>
                    <Text>
                        Test sequence 
                    </Text>
                    <StyledSelect onChange={(e) => setType(e.target.value)} value={type}>
          <option value="Test">Test</option>
          <option value="t2"> t1</option>
          <option value="t3"> t2</option>
          <option value="t4">t3 </option>
        
                    </StyledSelect>
                    <Text>
                        Model #
                    </Text>
                    <LabelModel type="text" value={inputValue} onChange={handleChange} placeholder='Test'/>
                    <Text>
                       Serial #
                    </Text>
                    <LabelSerial type="text" value={inputValue} onChange={handleChange} placeholder='#######################'
                    />
                    ///{data ? data?.serialnumber : "test"}
                    <Text>
                        Mac # 
                    </Text>
                    <LabelMac type="text" value={inputValue} onChange={handleChange} placeholder='#######################'/>
                    
                </MenuCard1>
                <Card1>
                    <InnerDiv1Card1>
                        <ButtonRun onClick={handleFetch}>
                            run
                            <Run/>
                        </ButtonRun>
                        
                    </InnerDiv1Card1>
                    <InnerDiv2Card1>
                        <LabelEta type="text" value={inputValue} onChange={handleChange} placeholder='#######################'/>
                
                        <divTextProg>
                        <TextScrole>
                            Overal Progress
                        </TextScrole>
                         <ProgressBarContainer1>
                          <ProgressBar1 progress={progress} />
                         </ProgressBarContainer1>
                         </divTextProg>
                        <InnerButton>
                            <Button>
                                save as CSV
                            </Button>
                            <Button>
                                Save as PDF
                            </Button>
                            <Button>
                                Print 
                            </Button>
                        </InnerButton>
                    </InnerDiv2Card1>
                    <InnerDiv3Card1>
                        <Text>
                            Qte Totale testee
                        </Text>
                        <Label type="text" value={inputValue} onChange={handleChange} placeholder='#######################'/>

                    
                        <Text>
                            Qte Totale OK
                        </Text>
                        <Label type="text" value={inputValue} onChange={handleChange} placeholder='#######################'/>
                        <Text>
                            Qte Totale NOK
                        </Text>
                        <Label type="text" value={inputValue} onChange={handleChange} placeholder='#######################'/>
                    </InnerDiv3Card1>
                </Card1>
                </Card1Container1>
                <Step>
                    <TextStp>
                        Step1:power Mot
                    </TextStp>
                </Step>
            
            </InnerContainer1>
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
        </Container1>
        {showPopup && (
        <ModalContainer>
            <DivPopup>
            <DivVerifier>
              <TextInsideBorder>Operator Instructions</TextInsideBorder>
              <TextVerif>
                Verifier le clignotement de la LED en "Couleur BLEUE"
              </TextVerif>
              <CardButton>
                <IconCheck />
                <IconX onClick={handlePopupClose} />
              </CardButton>
            </DivVerifier>
            </DivPopup>
            </ModalContainer>
      )}
        
    </MainContainer>
  )
}

export default Runtest