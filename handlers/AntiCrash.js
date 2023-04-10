module.exports = async(cometta) => {
    let dateNow = Date.now();
    console.log("[x] :: ".magenta + `Now starting antiCrash...`.brightYellow);
    //process.on('beforeExit', (code) => { // If You Want You Can Use
    //  console.log('=== [antiCrash] | [beforeExit] | [start] ==='.red.dim);
    //  console.log(code);
    //  console.log('=== [antiCrash] | [beforeExit] | [end] ==='.red.dim);
    //});
    //process.on('exit', (error) => { // If You Want You Can Use
    //  console.log('=== [antiCrash] | [exit] | [start] ==='.red.dim);
    //  console.log(error);
    //  console.log('=== [antiCrash] | [exit] | [end] ==='.red.dim);
    //});
    // process.on('multipleResolves', (type, promise, reason) => { // Needed
    //     console.log('=== [antiCrash] | [multipleResolves] | [start] ==='.red.dim);
    //     console.log(type, promise, reason);
    //     console.log('=== [antiCrash] | [multipleResolves] | [end] ==='.red.dim);
    // });
    process.on('unhandledRejection', (reason, promise) => { // Needed
        console.log('=== [antiCrash] | [unhandledRejection] | [start] ==='.red.dim);
        console.log(reason);
        console.log('=== [antiCrash] | [unhandledRejection] | [end] ==='.red.dim);
    });
    process.on('rejectionHandled', (promise) => { // If You Want You Can Use
        console.log('=== [antiCrash] | [rejectionHandled] | [start] ==='.red.dim);
        console.log(promise);
        console.log('=== [antiCrash] | [rejectionHandled] | [end] ==='.red.dim);
    })
    process.on("uncaughtException", (err, origin) => { // Needed
        console.log('=== [antiCrash] | [uncaughtException] | [start] ==='.red.dim);
        console.log(err);
        console.log('=== [antiCrash] | [uncaughtException] | [end] ==='.red.dim);
    });
    process.on('uncaughtExceptionMonitor', (err, origin) => { // Needed
        console.log('=== [antiCrash] | [uncaughtExceptionMonitor] | [start] ==='.red.dim);
        console.log(err);
        console.log('=== [antiCrash] | [uncaughtExceptionMonitor] | [end] ==='.red.dim);
    });
    process.on('warning', (warning) => { // If You Want You Can Use
        console.log('=== [antiCrash] | [warning] | [start] ==='.red.dim);
        console.log(warning);
        console.log('=== [antiCrash] | [warning] | [end] ==='.red.dim);
    });
    // process.on('SIGINT', () => { // If You Want You Can Use
    //     console.log('=== [antiCrash] | [SIGINT] ==='.red.dim);
    // });
    console.log("[x] :: ".magenta + `AntiCrash started after: `.brightGreen + `${Date.now() - dateNow}ms`.green);
    console.log('\n')
};