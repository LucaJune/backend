{
    "{asid}": {
      "profileList": ["Administrator", "Executives", "Readers", "Public"],
      "useCaseMap": {}
    },
    "*": {
      "profileList": ["Administrator", "Executives", "Readers", "Public"],
      "useCaseMap": {
        "item/create": {
          "sysStateList": ["active"],
          "profileList": ["Executives", "Readers", "Public"]
        },
        "item/delete": {
          "sysStateList": ["active"],
          "profileList": ["Executives", "Readers"]
        },
        "item/get": {
          "sysStateList": ["active"],
          "profileList": ["Executives", "Readers"]
        },
        "item/list": {
          "sysStateList": ["active"],
          "profileList": ["Executives", "Readers"]
        },
        "item/update": {
          "sysStateList": ["active"],
          "profileList": ["Executives", "Readers"]
        },
        "list/create": {
          "sysStateList": ["active"],
          "profileList": ["Executives", "Readers", "Public"]
        },
        "list/delete": {
          "sysStateList": ["active"],
          "profileList": ["Executives"]
        },
        "list/get": {
          "sysStateList": ["active"],
          "profileList": ["Executives", "Readers"]
        },
        "list/list": {
          "sysStateList": ["active"],
          "profileList": ["Executives", "Readers"]
        },
        "list/update": {
          "sysStateList": ["active"],
          "profileList": ["Executives"]
        }
      }
    }
  }
  