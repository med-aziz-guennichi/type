import { Router,Request,Response,NextFunction } from "express";
import {connectToDevice,scanBluetoothDevices} from "../controllers/scanController"
import { SerialPort } from "serialport";
import {ReadlineParser} from "@serialport/parser-readline"
import utf8 from "utf8"

const router: Router = Router();


router.get('/scan', async (req: Request, res: Response,next: NextFunction) => {
    try {
      const discoveredDevices = await scanBluetoothDevices();
      res.json(discoveredDevices);
    } catch (error) {
      next(error)
    }
  });

  router.post('/connect/:deviceName', async (req: Request, res: Response,next: NextFunction) => {
    const { deviceName } = req.params;
  
    try {
       connectToDevice(deviceName).then(()=>{
    })
    setTimeout(()=>{
        res.status(200).json({message:"Connected successfully"})
    },4000)
     
    } catch (error) {
      next(error)
    }
  });

//--------------------------
async function recv(bytes: number[], size: number) {
  return new Promise(async(resolve,reject)=>{
    let isPayloadComplete = false;
    let extractedData: any = {};
  let payload = "";
  let serialnumber = '';
  let productmodel = '';
  let probelength = '';
  let potdiam = '';
  let potlength = '';
  let potwidth = '';
  let sprinkleduration = '';
  let sprinklefreq = '';
  let sprinkletargettimestamp = '';
  let sprinklemode = '';
  let thresholdmin = '';
  let thresholdmax = '';
  let probecurrent = '';
  let batterycurrent = '';

  for (let i = 0; i <= size; ++i) {
    if (bytes[i] !== 13 && bytes[i] !== 10) {
      payload! += String.fromCharCode(bytes[i]);
    }
   
    
    if(i === size){
      extractedData.payload = payload.split("\x00")[0];
      extractedData.serialnumber = serialnumber;
      extractedData.productmodel = productmodel;
      extractedData.probelength = probelength;
      extractedData.potdiam = potdiam;
      extractedData.potlength = potlength;
      extractedData.potwidth = potwidth;
      extractedData.sprinkleduration = sprinkleduration;
      extractedData.sprinklefreq = sprinklefreq;
      extractedData.sprinkletargettimestamp = sprinkletargettimestamp;
      extractedData.sprinklemode = sprinklemode;
      extractedData.thresholdmin = thresholdmin;
      extractedData.thresholdmax = thresholdmax;
      extractedData.probecurrent = probecurrent;
      extractedData.batterycurrent = batterycurrent;
      
    }

  
  // Read serial number
  if (bytes[i] === 115) {
    serialnumber =
      payload[payload.length - 11] +
      payload[payload.length - 10] +
      payload[payload.length - 9] +
      payload[payload.length - 8] +
      payload[payload.length - 7] +
      payload[payload.length - 6] +
      payload[payload.length - 5] +
      payload[payload.length - 4] +
      payload[payload.length - 3] +
      payload[payload.length - 2];
  }

  // Read product model
  if (bytes[i] === 80) {
    productmodel = payload[payload.length - 2];
  }

  // Read probe length
  if (bytes[i] === 83) {
    probelength = payload[payload.length - 3] + payload[payload.length - 2];
  }

  // Read pot diameter
  if (bytes[i] === 68) {
    potdiam = payload[payload.length - 3] + payload[payload.length - 2];
  }

  // Read pot length
  if (bytes[i] === 76) {
    potlength = payload[payload.length - 3] + payload[payload.length - 2];
  }

  // Read pot width
  if (bytes[i] === 87) {
    potwidth = payload[payload.length - 3] + payload[payload.length - 2];
  }

  // Read sprinkle duration
  if (bytes[i] === 100) {
    sprinkleduration =
      payload[payload.length - 4] +
      payload[payload.length - 3] +
      payload[payload.length - 2];
  }

  // Read sprinkle frequency
  if (bytes[i] === 102) {
    sprinklefreq =
      payload[payload.length - 11] +
      payload[payload.length - 10] +
      payload[payload.length - 9] +
      payload[payload.length - 8] +
      payload[payload.length - 7] +
      payload[payload.length - 6] +
      payload[payload.length - 5] +
      payload[payload.length - 4] +
      payload[payload.length - 3] +
      payload[payload.length - 2];
  }

  // Read sprinkle target timestamp
  if (bytes[i] === 85) {
    sprinkletargettimestamp =
      payload[payload.length - 11] +
      payload[payload.length - 10] +
      payload[payload.length - 9] +
      payload[payload.length - 8] +
      payload[payload.length - 7] +
      payload[payload.length - 6] +
      payload[payload.length - 5] +
      payload[payload.length - 4] +
      payload[payload.length - 3] +
      payload[payload.length - 2];
  }

  // Read sprinkle mode
  if (bytes[i] === 77) {
    sprinklemode = payload[payload.length - 2];
  }

  // Read threshold min
  if (bytes[i] === 108) {
    thresholdmin =
      payload[payload.length - 4] +
      payload[payload.length - 3] +
      payload[payload.length - 2];
  }

  // Read threshold max
  if (bytes[i] === 104) {
    thresholdmax =
      payload[payload.length - 4] +
      payload[payload.length - 3] +
      payload[payload.length - 2];
  }

  // Read current probe value
  if (bytes[i] === 99) {
    probecurrent =
      payload[payload.length - 4] +
      payload[payload.length - 3] +
      payload[payload.length - 2];
  }

  // Read battery current value
  if (bytes[i] === 86) {
    batterycurrent =
      payload[payload.length - 5] +
      payload[payload.length - 4] +
      payload[payload.length - 3] +
      payload[payload.length - 2];
  }
    
  
  
    }
    resolve(extractedData)

  })    
}

router.get('/tram/:com', async (req: Request, res: Response) => {
  const {com} = req.params;
  try {
    
    const port = new SerialPort({
      path: com,
      baudRate: 9600,
    });

    if(!port){
      return res.status(400).json({message:"Choose the com"})
    }
    const parser = port.pipe(new ReadlineParser({delimiter:"\n"}));

    let responseSent = false; // Flag to track if response has been sent
    let largestSize = 0;
    let responseData: any = null;
    // Function to handle data and send the response
   async function handleData(trame: string) {
      // console.log(trame);
      const bytes = await trame.split('').map((c) => c.charCodeAt(0));
      const size =await bytes.length;
      if(size > largestSize){
        await recv(bytes, size).then((data) => {
          if (!responseSent) {
            console.log(data)
            largestSize = size;  
            responseData = data;
          }
        }).catch((err)=>res.send(err))
      }
     
    
    }
    
    for (let i = 0; i < 3; i++) {
      // Attach the data event listener
      parser.on('data', handleData);

      // Handle errors
      parser.on('error', (err: any) => {
        if (!responseSent) {
          responseSent = true; // Set the flag to true to prevent multiple responses
          res.status(500).send('Error reading data from the serial port.');
          // Remove data event listener and close the port on error to avoid memory leaks
          parser.removeListener('data', handleData);
          parser.removeAllListeners(); // Optionally, remove other listeners to avoid memory leaks
          port.close();
        }
      });

      // Wait for a short duration before removing the data event listener
      // to ensure that all data is received before processing the next iteration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Remove the data event listener after each iteration to avoid memory leaks
      parser.removeListener('data', handleData);
    }

    // Send the response using the data associated with the largest size
    if (responseData !== null) {
      if (!responseSent) {
        responseSent = true; // Set the flag to true to prevent multiple responses
        console.log(responseData);
        res.send(responseData);

        // Close the port after the response is sent
        port.close();
      }
    } else {
      // No data was received during the three iterations
      res.status(500).send('No data received from the serial port.');
    }
  } catch (error) {
    res.status(500).send('Error opening the serial port.');
  }
});
  export default router