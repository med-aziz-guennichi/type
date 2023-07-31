import {exec,ExecException} from "child_process"


// Interface to represent a Bluetooth device, containing its MAC address and name.
interface BluetoothDevice {
    macAddress: string;
    name: string;
  }
  /**
   * @description Function to scan for nearby Bluetooth devices and return a promise containing the list of discovered devices.
   * @author Med Aziz Guennichi
   * @returns {Array}
   */
  export function scanBluetoothDevices(): Promise<BluetoothDevice[]> {
      // We're using a Promise-based approach to handle asynchronous operations.
    return new Promise((resolve, reject) => {
      // The command to execute the Bluetooth scanning process.
      const command = 'ble-scan';
      // Executing the 'ble-scan' command using the 'exec' function.
      exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
      // If there was an error during the execution of the command, reject the Promise with the error.
        if (error) {
          reject(error);
          return;
        }
      // If there was any error output in the stderr, reject the Promise with a new Error containing the stderr.
        if (stderr) {
          reject(new Error(stderr));
          return;
        }
         // If the command was successful, parse the output and extract the discovered Bluetooth devices.
        const lines = stdout.trim().split('\n').slice(1);
        const discoveredDevices = lines.map((line) => {
          // Each line of the output contains the MAC address and the name of the device separated by whitespace.
          const [rawMacAddress, ...nameParts] = line.trim().split(/\s+/);
          // Extracting and trimming the MAC address.
          const macAddress = rawMacAddress.trim();
          // Reconstructing the name from nameParts by joining them with a space and trimming any leading/trailing spaces.
          const name = nameParts.join(' ').trim();
          // Creating an object representing the Bluetooth device with its MAC address and name.
          return { macAddress, name };
        });
        // Resolving the Promise with the array of discovered Bluetooth devices.
        resolve(discoveredDevices);
      });
    });
  }
  // Interface to represent a Bluetooth device, containing its MAC address and name.
  interface BluetoothDevice {
    macAddress: string;
    name: string;
  }
  /**
   * @description Function to connect to a Bluetooth device with a given deviceName and return a promise containing the connected Bluetooth device.
   * @author Med Aziz Guennichi
   * @param {string} deviceName  
   * @returns {object}
   */
  export function connectToDevice(deviceName: string): Promise<BluetoothDevice> {
    // We're using a Promise-based approach to handle asynchronous operations.
    return new Promise((resolve, reject) => {
      // The command to execute Bluetooth scanning and discover nearby devices.
      const scanCommand = 'ble-scan';
      // Executing the 'ble-scan' command to discover nearby Bluetooth devices.
      exec(scanCommand, async (scanError: ExecException | null, scanStdout: string, scanStderr: string) => {
        // If there was an error during the execution of the 'ble-scan' command, reject the Promise with the scanError.
        if (scanError) {
          reject(scanError);
          return;
        }
        // If there was any error output in the stderr of the 'ble-scan' command, reject the Promise with a new Error containing the stderr.
        if (scanStderr) {
          reject(new Error(scanStderr));
          return;
        }
        // Parsing the output of 'ble-scan' command to get the list of discovered Bluetooth devices.
        const lines = scanStdout.trim().split('\n').slice(1);
        const discoveredDevices = lines.map((line) => {
           // Each line of the output contains the MAC address and the name of the device separated by whitespace.
          const [rawMacAddress, ...nameParts] = line.trim().split(/\s+/);
          // Extracting and trimming the MAC address.
          const macAddress = rawMacAddress.trim();
          // Reconstructing the name from nameParts by joining them with a space and trimming any leading/trailing spaces.
          const name = nameParts.join(' ').trim();
          // Creating an object representing the Bluetooth device with its MAC address and name.
          return { macAddress, name };
        });
        // Finding the Bluetooth device with the provided deviceName from the list of discovered devices.
        const device = discoveredDevices.find((device) => device.macAddress === deviceName);
  
        // If the device with the specified name is not found, reject the Promise with an appropriate error message.
        if (!device) {
          reject(new Error(`Device with MAC address ${deviceName} not found.`));
          return;
        }
        // If the device is found, attempt to establish a connection to it using 'ble-serial' command.
        const connectCommand = `ble-serial -d ${device.macAddress}`;
        // Executing the 'ble-serial' command to establish a connection to the Bluetooth device.
        exec(connectCommand, (connectError: ExecException | null, connectStdout: string, connectStderr: string) => {
        // If there was an error during the execution of the 'ble-serial' command, reject the Promise with the connectError.
          if (connectError) {
            reject(connectError);
            return;
          }
          // If there was any error output in the stderr of the 'ble-serial' command, reject the Promise with a new Error containing the stderr.
          if (connectStderr) {
            reject(new Error(connectStderr));
          }
          // If the connection is successful, resolve the Promise with the connected Bluetooth device.
          resolve(device);
        });
      });
    });
  }