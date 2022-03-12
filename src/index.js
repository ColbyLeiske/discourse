import * as prefix from './prefix';
import * as conditions from './conditions';
import { getArgs } from './preRunHooks';
import { createClient } from './bot';
import { echo } from './commands';
import replyableError from './replyableerror';

export default {
    ...conditions,
    ...prefix,

    getArgs,

    // debug commands
    echo,

    //control client
    createClient,

    //errors
    replyableError,
}
