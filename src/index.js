import { execSync } from 'child_process';
import { chmodSync, constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';
import chalk from 'chalk';
import ora from 'ora';
import qrcode from 'qrcode-terminal';
import cleanupFiles from './helpers/cleanup.js';
import downloadRelease from './helpers/download.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const releaseUrl = `https://github.com/CzBix/WSLHostPatcher/releases/latest/download/WSLHostPatcher.zip`;

const zipFilePath = `${__dirname}/WSLHostPatcher.zip`;
const dllFilePath = `${__dirname}/WSLHostPatch.dll`;
const exeFilePath = `${__dirname}/WSLHostPatcher.exe`;

const main = async () => {
  try {
    const spinner = ora();
    spinner.start();
    spinner.text = 'Cleaning up previous patch files...';
    await new Promise((resolve) => setTimeout(resolve, 100));
    cleanupFiles([zipFilePath, dllFilePath, exeFilePath]);

    spinner.text = 'Downloading latest patch...';
    await new Promise((resolve) => setTimeout(resolve, 100));
    await downloadRelease(releaseUrl, zipFilePath);

    spinner.text = 'Extracting files...';
    await new Promise((resolve) => setTimeout(resolve, 100));
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(__dirname);

    spinner.text = 'Setting file permissions for executable...';
    await new Promise((resolve) => setTimeout(resolve, 100));
    chmodSync(
      exeFilePath,
      constants.S_IRUSR |
        constants.S_IWUSR |
        constants.S_IXUSR |
        constants.S_IRGRP |
        constants.S_IXGRP |
        constants.S_IROTH |
        constants.S_IXOTH,
    );

    spinner.text = 'Applying patch...';
    await new Promise((resolve) => setTimeout(resolve, 100));
    execSync(exeFilePath);

    spinner.text = 'Patch applied successfully!';
    await new Promise((resolve) => setTimeout(resolve, 100));
    spinner.stop();

    const ipAddress = execSync(
      `netsh.exe interface ip show address "Wi-Fi" \
   | grep 'IP Address' \
   | sed -r 's/^.*IP Address:*//'`,
    )
      .toString()
      .trim();
    console.log(chalk.green('Patch applied successfully!'));
    console.log(`On Your Network: ${ipAddress}`);
    qrcode.generate(ipAddress, { small: true }, function (qrcode) {
      console.log(qrcode);
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    cleanupFiles([zipFilePath, dllFilePath, exeFilePath]);
  }
};

main();
