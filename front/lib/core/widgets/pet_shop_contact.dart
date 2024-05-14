import 'package:canil_eduardo/core/utils/fonts.dart';
import 'package:flutter/material.dart';

class PetShopContact extends StatelessWidget {
  const PetShopContact({
    super.key,
    required this.imgPath,
    this.onPressed,
  });

  final String imgPath;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CircleAvatar(
          radius: 100,
          backgroundImage: AssetImage(
            imgPath,
          ),
        ),
        const SizedBox(
          height: 16,
        ),
        ElevatedButton(
          onPressed: onPressed,
          child: const Text(
            'Entrar em contato',
            style: Fonts.body16Regular,
          ),
        ),
      ],
    );
  }
}
