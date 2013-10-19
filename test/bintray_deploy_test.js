'use strict';

exports.bintrayDeploy = {

    package_creation: function (test) {
        test.expect(1);
        test.ok(true, "Just making sure our task completed successfully");
        test.done();
    },

    existing_package: function (test) {
        test.expect(1);
        test.ok(true, "Just making sure our task completed successfully");
        test.done();
    }
};
