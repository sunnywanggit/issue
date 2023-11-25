const { execSync } = require('child_process');
const inquirer = require('inquirer');
const { ENV_KEYS_MAP } = require('../../config/index');

const { PROJECT_PROMPT, ENV_PROMPT, SSR_PROMPT } = require('./config/prompt.js');

(async function () {
    const { project } = await inquirer.prompt(PROJECT_PROMPT);
    const { env } = await inquirer.prompt(ENV_PROMPT);
    const { ssr: enableSSR } = await inquirer.prompt(SSR_PROMPT);

    execSync(
        `cross-env ${ENV_KEYS_MAP.ENV}=${env} ${ENV_KEYS_MAP.SITE}=internal ${ENV_KEYS_MAP.ENABLE_SSR}=${enableSSR} pnpm --filter ./apps/${project} dev`,
        { stdio: 'inherit' },
    );
})();
