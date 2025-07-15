Java.perform(() => {
  const Intrinsics = Java.use("kotlin.jvm.internal.Intrinsics");
  Intrinsics.areEqual.overload("java.lang.Object", "java.lang.Object").implementation = (obj1, obj2) => {
    return true;
  }

  const lib = Process.getModuleByName('libflag.so');
  const flagImpl = lib.getExportByName('Java_com_mobilehackinglab_challenge_Activity2_getflag');
  Interceptor.attach(flagImpl, {
    onLeave: function () {
      const pattern = '4d 48 4c 7b'; // "MHL{"
      scanMemory(lib, pattern);
    }
  });
});

function scanMemory(module, pattern) {
  Memory.scan(module.base, module.size, pattern, {
    onMatch(addr) {
      console.log("\n[*] Match!");
      console.log("[*] Addr: " + addr);
      console.log("[*] String: " + ptr(addr).readCString());
    },
    onError(reason) {
      console.log("[!] Error: " + reason);
    },
    onComplete() {
      console.log("[*] Complete!");
    },
  });
}
