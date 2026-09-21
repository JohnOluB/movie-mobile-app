{ pkgs, ... }: {
  channel = "stable-24.11";

  packages = [
    pkgs.nodejs_22
    pkgs.nodePackages.npm
  ];

  env = {
    NODE_ENV = "development";
  };

  idx = {
    extensions = [
      "msjsdiag.vscode-react-native"
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
    ];

    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev"];
          manager = "web";
        };
      };
    };

    workspace = {
      onCreate = {
        npm-install = {
          command = "npm install";
          description = "Install dependencies";
        };
      };
      onStart = {
        default.openFiles = ["app/(tabs)/index.tsx"];
      };
    };
  };
}