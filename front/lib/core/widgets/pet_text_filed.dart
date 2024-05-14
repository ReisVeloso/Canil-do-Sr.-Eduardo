import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class PetTextFiled extends StatelessWidget {
  const PetTextFiled({
    super.key,
    required this.onChanged,
  });

  final Function(String value) onChanged;

  @override
  Widget build(BuildContext context) {
    return TextField(
      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
      onChanged: onChanged,
      decoration: InputDecoration(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(300),
          borderSide: BorderSide.none,
        ),
        isCollapsed: true,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 8,
        ),
        filled: true,
      ),
    );
  }
}
